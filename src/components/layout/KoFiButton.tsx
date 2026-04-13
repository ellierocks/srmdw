"use client";

export function KoFiButton() {
  return (
    <a
      title="Support me on ko-fi.com"
      href="https://ko-fi.com/W7W61UVSS7"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        backgroundColor: "#29abe0",
        color: "#fff",
        borderRadius: "7px",
        padding: "4px 12px",
        fontFamily: "'Quicksand', Helvetica, Century Gothic, sans-serif",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: 1,
        textDecoration: "none",
        boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.2)",
        transition: "opacity 0.2s",
        height: "34px",
      }}
    >
      <img
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt="Ko-fi donations"
        style={{
          height: "15px",
          width: "22px",
          verticalAlign: "middle",
        }}
      />
      <span>Tip me ;3</span>
    </a>
  );
}
