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
  notification: (
    <svg
      viewBox="-1 0 20 20"
      fill="none"
      style={{ width: "inherit", height: "inherit" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.62277 19.9999C8.21341 19.8724 7.7791 19.7894 7.39934 19.6086C6.51507 19.1875 5.97335 18.4937 5.71919 17.6066C5.712 17.582 5.71327 17.5557 5.70862 17.5146H12.3002C12.2271 17.8919 12.0698 18.2355 11.8456 18.5509C11.2823 19.3433 10.4958 19.8215 9.47786 19.9663C9.44487 19.971 9.414 19.9882 9.38229 19.9995H8.62235L8.62277 19.9999Z"
        fill="currentColor"
      />
      <path
        d="M8.99408 16.6699C6.55314 16.6699 4.11221 16.671 1.67127 16.6691C0.835634 16.6683 0.199603 16.2265 0.0389042 15.5155C-0.0938841 14.9285 0.117562 14.4413 0.607272 14.0515C1.20101 13.5792 1.67381 13.0177 2.03242 12.3739C2.49253 11.5483 2.70144 10.6674 2.7027 9.74115C2.70397 8.9405 2.69256 8.13947 2.70863 7.33883C2.76402 4.59919 4.99182 2.2137 7.91105 1.76408C8.06075 1.74099 8.11488 1.69912 8.10854 1.55707C8.09712 1.31014 8.10008 1.06244 8.10812 0.815124C8.12334 0.352974 8.51198 0.0011769 9 2.94256e-06C9.48886 -0.00117102 9.88004 0.349061 9.89611 0.811602C9.90499 1.06518 9.90457 1.31954 9.89695 1.57311C9.89357 1.69364 9.93501 1.73629 10.0678 1.76212C12.7202 2.27397 14.4223 3.73751 15.1226 6.16056C15.2567 6.62506 15.277 7.12438 15.2952 7.60923C15.3282 8.49362 15.2778 9.38152 15.3383 10.2639C15.4398 11.7467 16.1283 12.9868 17.3179 13.9819C17.6693 14.2758 17.9493 14.5967 17.9924 15.0467C18.0808 15.962 17.3745 16.6648 16.3588 16.6691C15.0926 16.6742 13.8265 16.6703 12.5603 16.6703C11.3716 16.6703 10.1828 16.6703 8.99408 16.6703V16.6699Z"
        fill="currentColor"
      />
    </svg>
  ),
  user: (
    <svg
      viewBox="2 2 20 20"
      fill="none"
      style={{ width: "inherit", height: "inherit" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6515 19.4054C20.2043 19.2902 20.5336 18.7117 20.2589 18.2183C19.6533 17.1307 18.6993 16.1749 17.4788 15.4465C15.907 14.5085 13.9812 14 12 14C10.0188 14 8.09292 14.5085 6.52112 15.4465C5.30069 16.1749 4.34666 17.1307 3.74108 18.2183C3.46638 18.7117 3.79562 19.2902 4.34843 19.4054C9.39524 20.4572 14.6047 20.4572 19.6515 19.4054Z"
        fill="currentColor"
      />
      <circle cx="12" cy="8" r="5" fill="currentColor" />
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
