const translations = {
  "en": {
    title: "Sales Report by Products and Segments",
    subtitle: "Analyzing Sales Dashboard Data in Power BI",
    panel1: "Total Sales by Products and Segments",
    panel2: "Total Sales by Products - Pie Chart",
    panel3: "Total Sales by Products - Area Chart",
    legend: "Legend",
    legendSales: "Circle size = sales; color = units sold",
    legendProfit: "Circle size = profit",
    footer: "© Dashboard demo",
    map1Title: "Map Visual 1: Sales and Units Sold by Country and Segments",
    map2Title: "Map Visual 2: Profit by Country",
    pieSegmentTitle: "Profit by Segment",
    totalSales: "Total Sales",
    totalUnits: "Total Units Sold"
  },
  "pt-BR": {
    title: "Relatório de Vendas por Produtos e Segmentos",
    subtitle: "Analisando dados do painel de vendas no Power BI",
    panel1: "Vendas Totais por Produtos e Segmentos",
    panel2: "Vendas Totais por Produtos - Gráfico de Pizza",
    panel3: "Vendas Totais por Produtos - Gráfico de Área",
    legend: "Legenda",
    legendSales: "Tamanho do círculo = vendas; cor = unidades vendidas",
    legendProfit: "Tamanho do círculo = lucro",
    footer: "© Demonstração do painel",
    map1Title: "Mapa 1: Vendas e Unidades Vendidas por País e Segmentos",
    map2Title: "Mapa 2: Lucro por País",
    pieSegmentTitle: "Lucro por Segmento",
    totalSales: "Vendas Totais",
    totalUnits: "Total de Unidades Vendidas"
  },
  "es": {
    title: "Informe de Ventas por Productos y Segmentos",
    subtitle: "Analizando datos del panel de ventas en Power BI",
    panel1: "Ventas Totales por Productos y Segmentos",
    panel2: "Ventas Totales por Productos - Gráfico de Tarta",
    panel3: "Ventas Totales por Productos - Gráfico de Área",
    legend: "Leyenda",
    legendSales: "Tamaño del círculo = ventas; color = unidades vendidas",
    legendProfit: "Tamaño del círculo = beneficio",
    footer: "© Demostración del panel",
    map1Title: "Mapa 1: Ventas y Unidades Vendidas por País y Segmentos",
    map2Title: "Mapa 2: Beneficio por País",
    pieSegmentTitle: "Beneficio por Segmento",
    totalSales: "Ventas Totales",
    totalUnits: "Total de Unidades Vendidas"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme and language from localStorage
  const savedTheme = localStorage.getItem("dashboardTheme") || "dark";
  const savedLang = localStorage.getItem("dashboardLang") || "en";

  applyTheme(savedTheme);
  applyLanguage(savedLang);

  // Attach toggles for each page header (three pages share same script)
  document.querySelectorAll("[id^=themeToggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = document.body.classList.contains("theme-dark") ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("dashboardTheme", next);
    });
  });

  document.querySelectorAll("[id^=langSelect]").forEach(sel => {
    sel.value = savedLang;
    sel.addEventListener("change", (e) => {
      applyLanguage(e.target.value);
      localStorage.setItem("dashboardLang", e.target.value);
    });
  });

  // Navigation focus/active styling
  document.querySelectorAll(".nav-btn").forEach(a => {
    a.addEventListener("focus", () => a.classList.add("focus"));
    a.addEventListener("blur", () => a.classList.remove("focus"));
  });

  // Build charts
  buildCharts();

  // Render SVG markers based on sample data
  renderMapMarkers();
});

/* Theme */
function applyTheme(mode){
  if(mode === "dark"){
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
    updateThemeIcons("🌙");
  } else {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    updateThemeIcons("☀️");
  }
}
function updateThemeIcons(icon){
  document.querySelectorAll("[id^=themeIcon]").forEach(el => el.textContent = icon);
}

/* Language */
function applyLanguage(lang){
  const dict = translations[lang] || translations.en;
  // Titles and static text
  document.querySelectorAll("#title, #titlePageTwo, #titlePageThree").forEach(el => {
    if(el) el.textContent = dict.title;
  });
  document.querySelectorAll("#subtitle, #subtitlePageTwo, #subtitlePageThree").forEach(el => {
    if(el) el.textContent = dict.subtitle;
  });
  // Panels
  if(document.getElementById("panel1Title")) document.getElementById("panel1Title").textContent = dict.panel1;
  if(document.getElementById("panel2Title")) document.getElementById("panel2Title").textContent = dict.panel2;
  if(document.getElementById("panel3Title")) document.getElementById("panel3Title").textContent = dict.panel3;
  if(document.getElementById("legendTitle")) document.getElementById("legendTitle").textContent = dict.legend;
  if(document.getElementById("legendText")) document.getElementById("legendText").textContent = dict.legendSales;
  if(document.getElementById("legendProfitTitle")) document.getElementById("legendProfitTitle").textContent = dict.legend;
  if(document.getElementById("legendProfitText")) document.getElementById("legendProfitText").textContent = dict.legendProfit;
  if(document.getElementById("footerText")) document.getElementById("footerText").textContent = dict.footer;
  if(document.getElementById("footerTextTwo")) document.getElementById("footerTextTwo").textContent = dict.footer;
  if(document.getElementById("footerTextThree")) document.getElementById("footerTextThree").textContent = dict.footer;
  if(document.getElementById("map1Title")) document.getElementById("map1Title").textContent = dict.map1Title;
  if(document.getElementById("map2Title")) document.getElementById("map2Title").textContent = dict.map2Title;
  if(document.getElementById("pieSegmentTitle")) document.getElementById("pieSegmentTitle").textContent = dict.pieSegmentTitle;
  if(document.getElementById("kpiSales")) document.getElementById("kpiSales").textContent = dict.totalSales;
  if(document.getElementById("kpiUnits")) document.getElementById("kpiUnits").textContent = dict.totalUnits;
}

/* Charts using Chart.js with sample data */
function buildCharts(){
  // Bar chart (index)
  const barCtx = document.getElementById("barChart");
  if(barCtx){
    new Chart(barCtx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Paseo","VTT","Amarilla","Carretera","Velo","Montana"],
        datasets: [
          { label: "Channel Partners", data: [2.4,1.8,1.2,1.6,1.1,0.9], backgroundColor: "#6c8cff" },
          { label: "Enterprise", data: [1.8,1.2,1.0,1.1,0.9,0.7], backgroundColor: "#ff7ab6" },
          { label: "Government", data: [1.2,0.9,0.8,0.7,0.6,0.5], backgroundColor: "#9b7aff" }
        ]
      },
      options: {
        responsive:true,
        maintainAspectRatio:false,
        plugins:{legend:{position:"top"}},
        scales:{y:{beginAtZero:true}}
      }
    });
  }

  // Pie chart (index)
  const pieCtx = document.getElementById("pieChart");
  if(pieCtx){
    new Chart(pieCtx.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Paseo","VTT","Amarilla","Carretera","Velo","Montana"],
        datasets: [{ data: [27,15,14,12,12,11], backgroundColor:["#6c8cff","#3b6bff","#ff9f6c","#b58cff","#ff7ab6","#7fd3ff"] }]
      },
      options:{responsive:true,maintainAspectRatio:false}
    });
  }

  // Area chart (index)
  const areaCtx = document.getElementById("areaChart");
  if(areaCtx){
    new Chart(areaCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Paseo","VTT","Amarilla","Carretera","Velo","Montana"],
        datasets: [{
          label:"Sales (M)",
          data:[27,15,14,12,12,11],
          fill:true,
          backgroundColor:"rgba(108,140,255,0.12)",
          borderColor:"#6c8cff",
          tension:0.3
        }]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
  }

  // Country bar (page_two)
  const countryBar = document.getElementById("countryBar");
  if(countryBar){
    new Chart(countryBar.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["United States","Canada","France","Germany","Mexico"],
        datasets: [{ label:"Sales (M)", data:[19.9,19.9,19.2,17.3,16.2], backgroundColor:"#ff7ab6" }]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
  }

  // Segment pie (page_three)
  const segPie = document.getElementById("segmentPie");
  if(segPie){
    new Chart(segPie.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Government","Small Business","Channel Partners","Midmarket","Enterprise"],
        datasets: [{ data:[35,20,25,10,10], backgroundColor:["#6c8cff","#ff7ab6","#7fd3ff","#b58cff","#ff9f6c"] }]
      },
      options:{responsive:true,maintainAspectRatio:false}
    });
  }
}

/* Map markers rendering (size/color by sample metrics) */
function renderMapMarkers(){
  // Sample metrics keyed by country
  const data = {
    "United States": { sales: 19900000, units: 180000, profit: 4200000 },
    "Canada": { sales: 19900000, units: 90000, profit: 3800000 },
    "France": { sales: 19200000, units: 85000, profit: 3600000 },
    "Germany": { sales: 17300000, units: 80000, profit: 3300000 },
    "Mexico": { sales: 16200000, units: 70000, profit: 3000000 },
    "Brazil": { sales: 12000000, units: 60000, profit: 2100000 }
  };

  // Utility to scale radii
  const scale = (val, minVal, maxVal, minR, maxR) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    const t = (clamped - minVal) / (maxVal - minVal || 1);
    return minR + t * (maxR - minR);
  };

  // Sales markers
  document.querySelectorAll(".marker.sales").forEach(el => {
    const country = el.dataset.country;
    const d = data[country];
    if(d){
      const r = scale(d.sales, 5e6, 20e6, 5, 18);
      el.setAttribute("r", r);
      // color by units (more units -> brighter)
      const unitRatio = scale(d.units, 20000, 200000, 0.3, 1);
      el.style.fill = `rgba(255,122,182,${unitRatio})`;
      el.setAttribute("aria-label", `${country} sales ${d.sales.toLocaleString()}`);
      el.tabIndex = 0;
      el.addEventListener("focus", () => el.style.stroke = "#fff");
      el.addEventListener("blur", () => el.style.stroke = "rgba(0,0,0,0.12)");
    }
  });

  // Profit markers
  document.querySelectorAll(".marker.profit").forEach(el => {
    const country = el.dataset.country;
    const d = data[country];
    if(d){
      const r = scale(d.profit, 1e6, 5e6, 4, 14);
      el.setAttribute("r", r);
      el.style.fill = `rgba(108,140,255,0.95)`;
      el.setAttribute("aria-label", `${country} profit ${d.profit.toLocaleString()}`);
      el.tabIndex = 0;
    }
  });
}

/* Accessibility: keyboard navigation for SVG markers */
document.addEventListener("keydown", (e) => {
  if(e.key === "Tab") return; // let default
});
