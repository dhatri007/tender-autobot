export function Textarea(props: any) {
  return (
    <textarea
      {...props}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "100%",
      }}
    />
  );
}