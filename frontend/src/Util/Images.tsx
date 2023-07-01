const svgs: Record<string, any> = {
  search: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style={{ width: "inherit", height: "inherit" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
      />
      <path
        d="M20 20L17 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  loading_circles: (
    <svg
      viewBox="0 0 84 24"
      fill="none"
      style={{ width: "inherit", height: "inherit" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="12" r="6" fill="currentColor"></circle>
      <circle cx="18" cy="12" r="6" fill="currentColor"></circle>
      <circle cx="42" cy="12" r="6" fill="currentColor"></circle>
      <circle cx="66" cy="12" r="6" fill="currentColor"></circle>
    </svg>
  ),
};

export default svgs;
