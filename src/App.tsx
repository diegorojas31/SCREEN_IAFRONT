import { useEffect, useRef, useState } from "react";
import ImageUpload from "./components/ImageUpload";
import CodePreview from "./components/CodePreview";
import Preview from "./components/Preview";
import { generateCode } from "./generateCode";
import Spinner from "./components/Spinner";
import classNames from "classnames";
import {
  FaCode,
  FaDesktop,
  FaDownload,
  FaMobile,
  FaUndo,
} from "react-icons/fa";

import { Switch } from "./components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { AppState, CodeGenerationParams, EditorTheme, Settings } from "./types";
import { usePersistedState } from "./hooks/usePersistedState";
import html2canvas from "html2canvas";
import { USER_CLOSE_WEB_SOCKET_CODE } from "./constants";
import CodeTab from "./components/CodeTab";
import OutputSettingsSection from "./components/OutputSettingsSection";
import { History } from "./components/history/history_types";
import HistoryDisplay from "./components/history/HistoryDisplay";
import { extractHistoryTree } from "./components/history/utils";
import toast from "react-hot-toast";
import { Stack } from "./lib/stacks";
import { CodeGenerationModel } from "./lib/models";
import ModelSettingsSection from "./components/ModelSettingsSection";
import { extractHtml } from "./components/preview/extractHtml";
import useBrowserTabIndicator from "./hooks/useBrowserTabIndicator";
import { MainLayout } from "./layout/MainLayout";

const IS_OPENAI_DOWN = false;

export const App = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  const [inputMode, setInputMode] = useState<"image">("image");

  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [executionConsole, setExecutionConsole] = useState<string[]>([]);
  const [updateInstruction, setUpdateInstruction] = useState("");
  const [isImportedFromCode, setIsImportedFromCode] = useState<boolean>(false);

  // Settings
  const [settings, setSettings] = usePersistedState<Settings>(
    {
      openAiApiKey: null,
      openAiBaseURL: null,
      screenshotOneApiKey: null,
      isImageGenerationEnabled: true,
      editorTheme: EditorTheme.COBALT,
      generatedCodeConfig: Stack.HTML_TAILWIND,
      codeGenerationModel: CodeGenerationModel.GPT_4_TURBO_2024_04_09,
      // Only relevant for hosted version
      isTermOfServiceAccepted: false,
    },
    "setting"
  );

  // Code generation model from local storage or the default value
  const selectedCodeGenerationModel =
    settings.codeGenerationModel || CodeGenerationModel.GPT_4_VISION;

  // App history
  const [appHistory, setAppHistory] = useState<History>([]);
  // Tracks the currently shown version from app history
  const [currentVersion, setCurrentVersion] = useState<number | null>(null);

  const [shouldIncludeResultImage, setShouldIncludeResultImage] =
    useState<boolean>(false);

  const wsRef = useRef<WebSocket>(null);

  const showReactWarning =
    selectedCodeGenerationModel ===
      CodeGenerationModel.GPT_4_TURBO_2024_04_09 &&
    settings.generatedCodeConfig === Stack.REACT_TAILWIND;

  // Indicate coding state using the browser tab's favicon and title
  useBrowserTabIndicator(appState === AppState.CODING);

  // When the user already has the settings in local storage, newly added keys
  // do not get added to the settings so if it's falsy, we populate it with the default
  // value
  useEffect(() => {
    if (!settings.generatedCodeConfig) {
      setSettings((prev) => ({
        ...prev,
        generatedCodeConfig: Stack.HTML_TAILWIND,
      }));
    }
  }, [settings.generatedCodeConfig, setSettings]);

  const takeScreenshot = async (): Promise<string> => {
    const iframeElement = document.querySelector(
      "#preview-desktop"
    ) as HTMLIFrameElement;
    if (!iframeElement?.contentWindow?.document.body) {
      return "";
    }

    const canvas = await html2canvas(iframeElement.contentWindow.document.body);
    const png = canvas.toDataURL("image/png");
    return png;
  };

  const downloadCode = () => {
    // Create a blob from the generated code
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set properties for download
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html"; // Set the file name for download
    document.body.appendChild(a); // Append to the document
    a.click(); // Programmatically click the anchor to trigger download

    // Clean up by removing the anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setAppState(AppState.INITIAL);
    setGeneratedCode("");
    setReferenceImages([]);
    setExecutionConsole([]);
    setUpdateInstruction("");
    setIsImportedFromCode(false);
    setAppHistory([]);
    setCurrentVersion(null);
    setShouldIncludeResultImage(false);
  };

  const regenerate = () => {
    if (currentVersion === null) {
      toast.error(
        "No current version set. Please open a Github issue as this shouldn't happen."
      );
      return;
    }

    // Retrieve the previous command
    const previousCommand = appHistory[currentVersion];
    if (previousCommand.type !== "ai_create") {
      toast.error("Only the first version can be regenerated.");
      return;
    }

    // Re-run the create
    doCreate(referenceImages, inputMode);
  };

  const cancelCodeGeneration = () => {
    wsRef.current?.close?.(USER_CLOSE_WEB_SOCKET_CODE);
    // make sure stop can correct the state even if the websocket is already closed
    cancelCodeGenerationAndReset();
  };

  const previewCode =
    appState === AppState.CODING
      ? extractHtml(generatedCode)
      : generatedCode;

  const cancelCodeGenerationAndReset = () => {
    // When this is the first version, reset the entire app state
    if (currentVersion === null) {
      reset();
    } else {
      // Otherwise, revert to the last version
      setGeneratedCode(appHistory[currentVersion].code);
      setAppState(AppState.CODE_READY);
    }
  };

  function doGenerateCode(
    params: CodeGenerationParams,
    parentVersion: number | null
  ) {
    setExecutionConsole([]);
    setAppState(AppState.CODING);

    // Merge settings with params
    const updatedParams = { ...params, ...settings };

    generateCode(
      wsRef,
      updatedParams,
      // On change
      (token) => setGeneratedCode((prev) => prev + token),
      // On set code
      (code) => {
        setGeneratedCode(code);
        if (params.generationType === "create") {
          setAppHistory([
            {
              type: "ai_create",
              parentIndex: null,
              code,
              inputs: { image_url: referenceImages[0] },
            },
          ]);
          setCurrentVersion(0);
        } else {
          setAppHistory((prev) => {
            // Validate parent version
            if (parentVersion === null) {
              toast.error(
                "No parent version set. Contact support or open a Github issue."
              );
              return prev;
            }

            const newHistory: History = [
              ...prev,
              {
                type: "ai_edit",
                parentIndex: parentVersion,
                code,
                inputs: {
                  prompt: updateInstruction,
                },
              },
            ];
            setCurrentVersion(newHistory.length - 1);
            return newHistory;
          });
        }
      },
      // On status update
      (line) => setExecutionConsole((prev) => [...prev, line]),
      // On cancel
      () => {
        cancelCodeGenerationAndReset();
      },
      // On complete
      () => {
        setAppState(AppState.CODE_READY);
      }
    );
  }

  // Initial version creation
  function doCreate(referenceImages: string[], inputMode: "image") {
    // Reset any existing state
    reset();

    setReferenceImages(referenceImages);
    setInputMode(inputMode);
    if (referenceImages.length > 0) {
      doGenerateCode(
        {
          generationType: "create",
          image: referenceImages[0],
          inputMode,
        },
        currentVersion
      );
    }
  }

  // Subsequent updates
  async function doUpdate() {
    if (currentVersion === null) {
      toast.error(
        "No current version set. Contact support or open a Github issue."
      );
      return;
    }

    let historyTree;
    try {
      historyTree = extractHistoryTree(appHistory, currentVersion);
    } catch {
      toast.error(
        "Version history is invalid. This shouldn't happen. Please contact support or open a Github issue."
      );
      return;
    }

    const updatedHistory = [...historyTree, updateInstruction];

    if (shouldIncludeResultImage) {
      const resultImage = await takeScreenshot();
      doGenerateCode(
        {
          generationType: "update",
          inputMode,
          image: referenceImages[0],
          resultImage: resultImage,
          history: updatedHistory,
          isImportedFromCode,
        },
        currentVersion
      );
    } else {
      doGenerateCode(
        {
          generationType: "update",
          inputMode,
          image: referenceImages[0],
          history: updatedHistory,
          isImportedFromCode,
        },
        currentVersion
      );
    }

    setGeneratedCode("");
    setUpdateInstruction("");
  }

  function setStack(stack: Stack) {
    setSettings((prev) => ({
      ...prev,
      generatedCodeConfig: stack,
    }));
  }

  function setCodeGenerationModel(codeGenerationModel: CodeGenerationModel) {
    setSettings((prev) => ({
      ...prev,
      codeGenerationModel,
    }));
  }

  return (
    <MainLayout>
      <div>
        <div className="lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-96 lg:flex-col">
          <div className="flex-grow flex flex-col gap-y-2 overflow-y-auto border-r border-gray-200 px-6 dark:bg-purple-900 dark:text-white text-white pb-10" style={{ background: 'linear-gradient(to bottom, #4b4b8f, #757abf)' }}>
            <div className="flex items-center justify-between mt-10 mb-2">
              <h1 className="text-2xl ">Screenshot to Code</h1>
            </div>

            <OutputSettingsSection
              stack={settings.generatedCodeConfig}
              setStack={(config) => setStack(config)}
              shouldDisableUpdates={
                appState === AppState.CODING || appState === AppState.CODE_READY
              }
            />

            <ModelSettingsSection
              codeGenerationModel={selectedCodeGenerationModel}
              setCodeGenerationModel={setCodeGenerationModel}
              shouldDisableUpdates={
                appState === AppState.CODING || appState === AppState.CODE_READY
              }
            />

            {showReactWarning && (
              <div className="text-sm bg-yellow-200 rounded p-2">
                Sorry - React is not currently working with GPT-4 Turbo. Please
                use GPT-4 Vision or Claude Sonnet. We are working on a fix.
              </div>
            )}

            {appState !== AppState.CODE_READY}

            {IS_OPENAI_DOWN && (
              <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded">
                OpenAI API is currently down. Try back in 30 minutes or later. We
                apologize for the inconvenience.
              </div>
            )}

            {(appState === AppState.CODING ||
              appState === AppState.CODE_READY) && (
              <>
                {/* Show code preview only when coding */}
                {appState === AppState.CODING && (
                  <div className="flex flex-col">

                    <div className="flex items-center gap-x-1">
                      <Spinner />
                      {executionConsole.slice(-1)[0]}
                    </div>

                    <CodePreview code={generatedCode} />

                    <div className="flex w-full">
                      <Button
                        onClick={cancelCodeGeneration}
                        className="w-full dark:text-white dark:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {appState === AppState.CODE_READY && (
                  <div>
                    <div className="grid w-full gap-2">
                      <Textarea
                        placeholder="Tell the AI what to change..."
                        onChange={(e) => setUpdateInstruction(e.target.value)}
                        value={updateInstruction}
                      />
                      <div className="flex justify-between items-center gap-x-2">
                        <div className="font-500 text-xs text-slate-700 dark:text-white">
                          Include screenshot of current version?
                        </div>
                        <Switch
                          checked={shouldIncludeResultImage}
                          onCheckedChange={setShouldIncludeResultImage}
                          className="dark:bg-gray-700"
                        />
                      </div>
                      <Button
                        onClick={doUpdate}
                        className="dark:text-white dark:bg-gray-700"
                      >
                        Update
                      </Button>
                    </div>
                    <div className="flex items-center justify-end gap-x-2 mt-2">
                      <Button
                        onClick={regenerate}
                        className="flex items-center gap-x-2 dark:text-white dark:bg-gray-700"
                      >
                        🔄 Regenerate
                      </Button>
                    </div>
                  </div>
                )}

                {/* Reference image display */}
                <div className="flex gap-x-2 mt-2">
                  {referenceImages.length > 0 && (
                    <div className="flex flex-col">
                      <div
                        className={classNames({
                          "scanning relative": appState === AppState.CODING,
                        })}
                      >
                        {inputMode === "image" && (
                          <img
                            className="w-[340px] border border-gray-200 rounded-md"
                            src={referenceImages[0]}
                            alt="Reference"
                          />
                        )}
                      </div>
                      <div className="text-gray-400 uppercase text-sm text-center mt-1">
                          Original Screenshot
                      </div>
                    </div>
                  )}
                  <div className="bg-gray-400 px-4 py-2 rounded text-sm hidden">
                    <h2 className="text-lg mb-4 border-b border-gray-800">
                      Console
                    </h2>
                    {executionConsole.map((line, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-400 mb-2 text-gray-600 font-mono"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {
              <HistoryDisplay
                history={appHistory}
                currentVersion={currentVersion}
                revertToVersion={(index) => {
                  if (
                    index < 0 ||
                    index >= appHistory.length ||
                    !appHistory[index]
                  )
                    return;
                  setCurrentVersion(index);
                  setGeneratedCode(appHistory[index].code);
                }}
                shouldDisableReverts={appState === AppState.CODING}
              />
            }
          </div>
        </div>

        <main className="py-2 lg:pl-96 mt-10">
          {appState === AppState.INITIAL && (
            <div className="flex flex-col justify-center items-center gap-y-10">
              <ImageUpload setReferenceImages={doCreate} />
            </div>
          )}

          {(appState === AppState.CODING || appState === AppState.CODE_READY) && (
            <div className="ml-4">
              <Tabs defaultValue="desktop">
                <div className="flex justify-between mr-8 mb-4">
                  <div className="flex items-center gap-x-2">
                    {appState === AppState.CODE_READY && (
                      <>
                        <Button
                          onClick={reset}
                          className="flex items-center ml-4 gap-x-2 dark:text-white dark:bg-gray-700"
                        >
                          <FaUndo />
                          Reset
                        </Button>
                        <Button
                          onClick={downloadCode}
                          variant="secondary"
                          className="flex items-center gap-x-2 mr-4 dark:text-white dark:bg-gray-700"
                        >
                          <FaDownload /> Download
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <TabsList>
                      <TabsTrigger value="desktop" className="flex gap-x-2">
                        <FaDesktop /> Desktop
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="flex gap-x-2">
                        <FaMobile /> Mobile
                      </TabsTrigger>
                      <TabsTrigger value="code" className="flex gap-x-2">
                        <FaCode />
                        Code
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                <TabsContent value="desktop">
                  <Preview code={previewCode} device="desktop" />
                </TabsContent>
                <TabsContent value="mobile">
                  <Preview code={previewCode} device="mobile" />
                </TabsContent>
                <TabsContent value="code">
                  <CodeTab
                    code={previewCode}
                    setCode={setGeneratedCode}
                    settings={settings}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
