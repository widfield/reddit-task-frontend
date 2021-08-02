import MaterialDialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";

const Content = styled.div`
  padding: 30px 40px;
  min-width: 300px;
`;

const Dialog = ({ title, children, onClose, isOpen }) => {
  return (
    <MaterialDialog onClose={onClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <Content>{children}</Content>
    </MaterialDialog>
  );
};

export default Dialog;
