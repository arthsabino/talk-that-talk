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
      viewBox="-1 0 20 20"
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
      className="circles"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="12" r="6" fill="currentColor"></circle>
      <circle cx="18" cy="12" r="6" fill="currentColor"></circle>
      <circle cx="42" cy="12" r="6" fill="currentColor"></circle>
      <circle cx="66" cy="12" r="6" fill="currentColor"></circle>
    </svg>
  ),
  arrow_left: (
    <svg
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "inherit", height: "inherit" }}
    >
      <path
        d="M19.6581 9C20.2104 9 20.6581 8.55228 20.6581 8C20.6581 7.44772 20.2104 7 19.6581 7L19.6581 9ZM1.20711 7.29289C0.816586 7.68342 0.816586 8.31658 1.20711 8.70711L7.57107 15.0711C7.96159 15.4616 8.59476 15.4616 8.98528 15.0711C9.37581 14.6805 9.37581 14.0474 8.98528 13.6569L3.32843 8L8.98529 2.34314C9.37581 1.95262 9.37581 1.31946 8.98529 0.928931C8.59476 0.538407 7.9616 0.538407 7.57107 0.928931L1.20711 7.29289ZM19.6581 7L1.91422 7L1.91422 9L19.6581 9L19.6581 7Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  eye: (
    <svg
      viewBox="0 0 720 560"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "inherit", height: "inherit" }}
    >
      <path
        fill="currentColor"
        d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"
      ></path>
    </svg>
  ),

  spinner: (
    <svg fill="none" viewBox="0 0 24 24" className="animate-spin">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        style={{ opacity: 0.4 }}
        fill="white"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
};

export default svgs;
