import "./Loading.css";

export const Loading = () => {
  return (
    <div className="loading-screen" data-testid="loading-screen">
      <div className="lds-spinner" data-testid="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
