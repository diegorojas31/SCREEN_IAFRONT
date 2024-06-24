import { ReactNode } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface DialogInfoProps {
    description: ReactNode;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DialogInfo = ({ description, open, onClose, onConfirm }: DialogInfoProps) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{"Confirmación"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="error">
                Cancelar
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary" autoFocus>
                Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
