import { CircularProgress, Button } from "@mui/material";

interface ActionButtonProps {
  isLoading: boolean;
  onClick: () => void;
  title: string;
}
export const ActionButton = (props: ActionButtonProps) => {
  const { isLoading, onClick, title } = props;
  return (
    <div className="button-container">
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          {title}
        </Button>
      )}
    </div>
  );
};
