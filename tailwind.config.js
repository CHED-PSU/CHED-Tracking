/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./resources/**/*.blade.php", "./resources/**/*.jsx"],
  theme: {
      extend: {
          colors: {
              "active-page": "#5E37FF",
              "app-bg": "#F0F2F5",
              "primary": "#0049AF",
              "lightPri": "#4F6DFF",
              "purple-bg": "#C2CDFF",

              "lightColor-900": "#E4E6EB",
              "lightColor-800": "#EDEDED",
              "lightColor-700": "#D1D1D1",
              "lightColor-600": "#464646",
              "lightColor-500": "#696969",

              "darkColor-900": "#18191A",
              "darkColor-800": "#242526",
              "darkColor-700": "#3A3B3C",

              //icon
              "active-icon": "#1876F2",
              "icon-light": "#E7E9ED",
              "icon-dark": "#050505",

              //light Mode icon bg
              "bg-iconLight": "#F6F6F6",
              "bg-iconLightHover": "#D8DADF",
              "bg-iconLightActive": "#E5F1FD",
              "border-iconLight": "#D8DCDF",

              //Dark Mode icon bg
              "bg-iconDark": "#3A3B3C",
              "bg-iconDarkHover": "#4E4F50",
              "bg-iconDarkActive": "#263951",

              //table colors
              th: "#878787",
              "t-bg": "#F9FAFC",
              "t-border": "#E3E3E3",

              //separator color
              sc: "#D1D1D1",

              //text colors
              "text-black": "#242526",
              "text-gray": "#878787",
              "text-gray-2": "#434343",
              "text-blue": "#1E3A8A",
              "c-received": "#6E6E6E",
              "c-inspecting": "#14AE5C",
              "c-repairing": "#C235FF",
              "c-rfr": "#E4B200",
              "c-returned": "#011284",
              "c-unserviceable": "#FF486A",

          },
          fontFamily: {
              sans: ["Montserrat", "sans-serif"],
          },
          fontSize: {
              ss: "0.65rem",
              "2base": "14px",
          },
          spacing: {
              18: "68px",
              58: "232px",
          },
          dropShadow: {
              light: "0 0px 12px rgba(255, 255, 255, 0.1)",
              dark: "0 0px 12px rgba(0, 0, 0, 0.1)",
              card1: "0px 5px 10px rgba(71, 93, 241, 0.7)",
              card2: "0px 5px 10px rgba(252, 97, 145, 0.75)",
              pageIn: "0 0 10px rgba(0, 73, 175, 0.75)",
              pageInD: "0 0 10px rgba(71, 106, 202, 0.6)"
          },
          backgroundImage: {
              "card-1": "url('../../public/img/card_1.png')",
              "card-2": "url('../../public/img/card_2.png')",
              "card-3": "url('../../public/img/card_3.png')",
              "card-4": "url('../../public/img/card_4.png')",
              "card-5": "url('../../public/img/logs_card.png')",
              "card-6": "url('../../public/img/items_card.png')",
              "card-7": "url('../../public/img/requests_card.png')",
              "card-8": "url('../../public/img/card_5.jpg')",
              "card-9": "url('../../public/img/card_9.png')",
              "procurement-icon": "url('../../public/img/procurement-icon.png')",
              "inventory-icon": "url('../../public/img/inventory-icon.png')",
              "tracking-icon": "url('../../public/img/tracking-icon.png')",
              "circle-huge": "url('../../public/img/huge-circle-bg.png')",
              "bg-pattern": "url('../../public/img/pattern-bg.png')"
          },
      },
  },
  plugins: [],
}
