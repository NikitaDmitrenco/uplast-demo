import { useEffect, useMemo, useState } from "react";
import { Link, Route, Switch, useLocation, useRoute } from "wouter";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Factory,
  FileText,
  Filter,
  Grid2X2,
  HelpCircle,
  Layers3,
  Menu,
  Minus,
  Package,
  Phone,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { Toaster, toast } from "sonner";

type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  article: string;
  unit: string;
  ip?: string;
  size?: string;
  material?: string;
  color?: string;
  image?: string;
  description: string;
  tags: string[];
};

type SpecItem = Product & { qty: number };

const STORAGE_LOGO = "/manus-storage/logo-blue_0805f6b2.png";
const STORAGE_HERO = "/manus-storage/hero-product_12ddb344.jpg";
const STORAGE_CATALOG = "/manus-storage/catalog-product_99d08219.webp";
const STORAGE_POPULAR = "/manus-storage/popular-product_c828659a.png";
const STORAGE_PIC1 = "/manus-storage/pic1_a4a5be04.png";
const STORAGE_PIC3 = "/manus-storage/pic3_c10e2501.png";
const STORAGE_PIC4 = "/manus-storage/pic4_81a266c2.png";
const STORAGE_PIC5 = "/manus-storage/pic5_e567e986.png";

const products: Product[] = [
  {
    id: "box-400-010k",
    name: "Бокс для автоматических выключателей на 1–2 модуля с крышкой 140х50х65",
    category: "Боксы пластиковые",
    subcategory: "Боксы пластиковые для наружной установки",
    article: "400-010К",
    unit: "шт",
    ip: "IP30",
    size: "140х50х65мм",
    material: "полипропилен",
    color: "белый",
    image: STORAGE_CATALOG,
    description: "Бокс для наружной установки с крышкой на 1–2 модуля.",
    tags: ["наружная установка", "1–2 модуля"],
  },
  {
    id: "box-400-020k",
    name: "Бокс для наружной установки с крышкой на 2–4 модуля 140х100х65",
    category: "Боксы пластиковые",
    subcategory: "Боксы пластиковые для наружной установки",
    article: "400-020К",
    unit: "шт",
    ip: "IP30",
    size: "140x100x65мм",
    material: "полипропилен",
    color: "серый",
    image: STORAGE_POPULAR,
    description: "Бокс для наружной установки с крышкой на 2–4 модуля.",
    tags: ["наружная установка", "2–4 модуля"],
  },
  {
    id: "box-400-110",
    name: "Бокс для наружной установки без крышки на 1–2 модуля 125х42х60",
    category: "Боксы пластиковые",
    subcategory: "Боксы пластиковые для наружной установки",
    article: "400-110",
    unit: "шт",
    ip: "IP30",
    size: "42х125х60мм",
    material: "полипропилен",
    color: "серый",
    image: STORAGE_CATALOG,
    description: "Бокс для наружной установки без крышки на 1–2 модуля.",
    tags: ["без крышки", "1–2 модуля"],
  },
  {
    id: "box-400-080",
    name: "Бокс для наружной установки без крышки на 6–8 модулей 76х125х60",
    category: "Боксы пластиковые",
    subcategory: "Боксы пластиковые для наружной установки",
    article: "400-080",
    unit: "шт",
    ip: "IP31",
    size: "76х125х60мм",
    material: "полипропилен",
    color: "черный",
    image: STORAGE_CATALOG,
    description: "Бокс для наружной установки без крышки на 6–8 модулей.",
    tags: ["без крышки", "6–8 модулей"],
  },
  {
    id: "shield-prv-12",
    name: "Щит распределительный внутренний пластиковый 12 модулей",
    category: "Боксы пластиковые",
    subcategory: "Корпуса пластиковые для модульного оборудования",
    article: "ЩРВ-П 12",
    unit: "шт",
    ip: "IP41",
    material: "полистирол",
    color: "белый",
    image: STORAGE_HERO,
    description: "Щит распределительный внутренний пластиковый на 12 модулей.",
    tags: ["12 модулей", "внутренняя установка"],
  },
  {
    id: "shield-prn-24",
    name: "Щит распределительный наружный пластиковый на 24 модуля",
    category: "Боксы пластиковые",
    subcategory: "Корпуса пластиковые для модульного оборудования",
    article: "ЩРН-П 24",
    unit: "шт",
    ip: "IP41",
    material: "полистирол",
    color: "серый",
    image: STORAGE_HERO,
    description: "Щит распределительный наружный пластиковый на 24 модуля.",
    tags: ["24 модуля", "наружная установка"],
  },
  {
    id: "box-030-070",
    name: "Коробка распаячная двухкомпонентная для прямого монтажа 80х80х40",
    category: "Коробка электромонтажная",
    subcategory: "Коробки для наружного монтажа",
    article: "030-070",
    unit: "шт",
    ip: "IP66",
    material: "полипропилен",
    image: STORAGE_HERO,
    description: "Для открытого монтажа электропроводки; защищает места соединения проводов и кабелей от механических повреждений, пыли и влаги.",
    tags: ["HF-безгалогенный", "прямой монтаж"],
  },
  {
    id: "clip-16",
    name: "Крепёж-клипса для прямого монтажа Ø16",
    category: "Аксессуары",
    subcategory: "Крепёж для труб и кабеля",
    article: "—",
    unit: "шт",
    material: "полипропилен",
    image: STORAGE_POPULAR,
    description: "Крепление гладких и гофрированных труб ПВХ и ПНД одного диаметра к поверхности стен, потолков и полов.",
    tags: ["Ø16", "прямой монтаж"],
  },
  {
    id: "holder-6",
    name: "Держатели кабеля для прямого монтажа (односторонний на 6 кабелей)",
    category: "Аксессуары",
    subcategory: "Крепёж для труб и кабеля",
    article: "—",
    unit: "шт",
    material: "полипропилен",
    image: STORAGE_POPULAR,
    description: "Крепление кабеля диаметром до 10 мм по бетонным поверхностям при помощи монтажного пистолета.",
    tags: ["до 10 мм", "6 кабелей"],
  },
  {
    id: "pipe-pvc",
    name: "Труба гладкая (техническая) ПНД",
    category: "Труба гладкая",
    subcategory: "Техническая труба",
    article: "—",
    unit: "м",
    material: "ПНД",
    image: STORAGE_CATALOG,
    description: "Техническая гладкая труба для электромонтажных решений.",
    tags: ["ПНД", "гладкая"],
  },
];

const categories = [
  { name: "Боксы пластиковые", count: "14", icon: Box, image: STORAGE_CATALOG, description: "Корпуса, боксы для наружной установки и модульного оборудования" },
  { name: "Коробка электромонтажная", count: "—", icon: Grid2X2, image: STORAGE_HERO, description: "Решения для открытого монтажа электропроводки" },
  { name: "Труба гладкая", count: "—", icon: Layers3, image: STORAGE_CATALOG, description: "Техническая гладкая труба ПНД" },
  { name: "Труба гофрированная", count: "—", icon: SlidersHorizontal, image: STORAGE_CATALOG, description: "Защита и прокладка кабеля" },
  { name: "Металлорукав", count: "—", icon: Settings2, image: STORAGE_HERO, description: "Электромонтажная продукция" },
  { name: "Аксессуары", count: "—", icon: Zap, image: STORAGE_POPULAR, description: "Крепёж для труб и кабеля" },
  { name: "Шкафы защитные для газового счётчика", count: "—", icon: ShieldCheck, image: STORAGE_HERO, description: "Защитные решения для установки" },
  { name: "Шкафы металлические для модульного оборудования", count: "—", icon: Factory, image: STORAGE_HERO, description: "Металлические шкафы и щиты" },
];

const growthPoints = [
  {
    number: "01",
    problem: "Каталог раскрывает товарные категории последовательно, без единой логики пути к нужному изделию.",
    change: "Собираем архитектуру «категория → подкатегория → список → карточка» и добавляем breadcrumbs.",
    result: "Пользователь понимает, где он находится, и быстрее переходит от задачи к конкретной позиции.",
  },
  {
    number: "02",
    problem: "Фильтры находятся внутри категории и не дают единого сценария технического подбора.",
    change: "Выносим подбор в самостоятельный инструмент: категория, степень защиты, материал и размер.",
    result: "Закупщик может сформировать короткий список, даже если не знает артикул заранее.",
  },
  {
    number: "03",
    problem: "Карточка продукта разделяет описание и характеристики, а следующий шаг не очевиден для оптового запроса.",
    change: "Ставим характеристики рядом с CTA и добавляем «В спецификацию» как основной B2B-действие.",
    result: "Продукт становится частью рабочего сценария, а не конечной страницей чтения.",
  },
  {
    number: "04",
    problem: "Запрос контакта существует отдельно от выбора продукции.",
    change: "Связываем спецификацию, количество позиций и форму оптового предложения в один поток.",
    result: "Менеджер получает более понятный контекст запроса и меньше уточняющих итераций.",
  },
];

function App() {
  const [spec, setSpec] = useState<SpecItem[]>(() => {
    try {
      const saved = localStorage.getItem("uplast-spec");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("uplast-spec", JSON.stringify(spec));
  }, [spec]);

  const addToSpec = (product: Product) => {
    setSpec((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { ...product, qty: 1 }];
    });
    toast.success("Позиция добавлена в спецификацию", { description: product.name, duration: 2200 });
  };

  const updateQty = (id: string, delta: number) => setSpec((current) => current.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const removeFromSpec = (id: string) => setSpec((current) => current.filter((item) => item.id !== id));
  const clearSpec = () => setSpec([]);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ style: { background: "#102337", color: "#fff", border: "1px solid #254763" } }} />
      <Header specCount={spec.length} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="page-shell">
        <Switch>
          <Route path="/" component={() => <HomePage addToSpec={addToSpec} />} />
          <Route path="/catalog" component={() => <CatalogPage addToSpec={addToSpec} />} />
          <Route path="/product/:id" component={() => <ProductPage addToSpec={addToSpec} />} />
          <Route path="/selector" component={() => <SelectorPage addToSpec={addToSpec} />} />
          <Route path="/specification" component={() => <SpecificationPage spec={spec} updateQty={updateQty} removeFromSpec={removeFromSpec} clearSpec={clearSpec} />} />
          <Route path="/partner" component={PartnerPage} />
          <Route path="/redesign" component={RedesignPage} />
          <Route path="/contacts" component={ContactsPage} />
          <Route component={() => <NotFoundPage />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

function Header({ specCount, mobileOpen, setMobileOpen }: { specCount: number; mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  const [location] = useLocation();
  const links = [
    { href: "/catalog", label: "Каталог" },
    { href: "/selector", label: "Подбор продукции", labelShort: "Подбор" },
    { href: "/redesign", label: "Концепция", labelShort: "Концепция" },
    { href: "/partner", label: "Партнёрам", labelShort: "Партнёрам" },
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-lockup" onClick={() => setMobileOpen(false)}>
          <img src={STORAGE_LOGO} alt="Uplast — УралОмегаПласт" className="brand-logo" />
          <span className="brand-caption">DIGITAL PRODUCT CONCEPT</span>
        </Link>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Основная навигация">
          {links.map((link) => <Link key={link.href} href={link.href} className={location === link.href ? "active" : ""} onClick={() => setMobileOpen(false)}><span className="desktop-label">{link.label}</span><span className="mobile-label">{link.labelShort}</span></Link>)}
          <Link href="/contacts" className={`nav-secondary ${location === "/contacts" ? "active" : ""}`} onClick={() => setMobileOpen(false)}>Контакты</Link>
        </nav>
        <div className="header-actions">
          <Link href="/specification" className="spec-link" aria-label="Открыть спецификацию">
            <ClipboardList size={17} strokeWidth={1.8} />
            <span className="spec-label">Спецификация</span>
            <span className="spec-count">{specCount}</span>
          </Link>
          <button className="mobile-menu-button" aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-grid wrap">
      <div><img src={STORAGE_LOGO} alt="Uplast" className="footer-logo" /><p className="footer-note">ООО «УралОмегаПласт»<br />Электромонтажная продукция<br />из Лысьвы</p></div>
      <div><div className="footer-label">Навигация</div><Link href="/catalog">Каталог</Link><Link href="/selector">Подбор продукции</Link><Link href="/partner">Кабинет партнёра · DEMO</Link></div>
      <div><div className="footer-label">Контакты</div><a href="tel:+73424936300">+7 (34249) 3-63-00</a><a href="mailto:info@u-plast.ru">info@u-plast.ru</a><span>г. Лысьва, ул. Революции, 5</span></div>
      <div className="footer-cta"><span className="mono">B2B DIGITAL CONCEPT / 2024</span><Link className="text-link" href="/specification">Собрать спецификацию <ArrowUpRight size={15} /></Link></div>
    </div>
    <div className="footer-bottom wrap"><span>Прототип нового пользовательского опыта для Uplast</span><span>Собрано для презентации агентства</span></div>
  </footer>;
}

function HomePage({ addToSpec }: { addToSpec: (product: Product) => void }) {
  return <main className="page-enter">
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> UPLAST / CONCEPT 01</div>
        <h1>Продукция,<br /><em>с которой</em><br />легче работать.</h1>
        <p className="hero-lead">Концепция цифрового каталога для УралОмегаПласт: от технического подбора до оптового запроса в одном рабочем сценарии.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/catalog">Открыть каталог <ArrowRight size={17} /></Link><Link className="button button-ghost" href="/redesign">Смотреть концепцию <ArrowDownRight size={17} /></Link></div>
        <div className="hero-meta"><span><b>01</b> цифровая архитектура</span><span><b>02</b> подбор по параметрам</span><span><b>03</b> спецификация</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-grid-label mono">PRODUCT SYSTEM / 2024</div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-object"><img src={STORAGE_HERO} alt="Электромонтажная продукция Uplast" /><div className="object-caption"><span>UPLAST / UРАЛОМЕГАПЛАСТ</span><span>Системы электромонтажа</span></div></div>
        <div className="hero-stamp"><span>20</span><small>лет на рынке<br />электромонтажной<br />продукции</small></div>
        <div className="hero-spec mono"><span>IP66</span><span>HF</span><span>80 × 80 × 40</span></div>
      </div>
    </section>

    <section className="signal-strip"><div className="wrap signal-inner"><span className="signal-title">ПЕРЕОСМЫСЛИВАЕМ НЕ БРЕНД — <strong>ОПЫТ РАБОТЫ С НИМ</strong></span><span className="signal-note">Сохраняем терминологию, добавляем ясный следующий шаг <ArrowRight size={15} /></span></div></section>

    <section className="intro-section wrap"><div className="section-kicker">01 / ЗАДАЧА</div><div className="intro-grid"><h2>Uplast уже знает<br /><em>свой продукт.</em></h2><div><p className="intro-lead">Новая версия должна помочь пользователю быстрее понять, что выбрать для своей задачи — и довести выбор до запроса оптового предложения.</p><div className="intro-facts"><div><img src={STORAGE_PIC1} alt="" /><span>Производим электромонтажную продукцию: коробки, боксы, щиты, трубы и металлорукав.</span></div><div><img src={STORAGE_PIC3} alt="" /><span>Разрабатываем и модернизируем продукцию, выполняем заказы по индивидуальным чертежам.</span></div><div><img src={STORAGE_PIC4} alt="" /><span>Доставляем продукцию по России и в страны СНГ.</span></div></div></div></div></section>

    <section className="category-section wrap"><div className="section-heading-row"><div><div className="section-kicker">02 / КАТАЛОГ</div><h2>Система продукции</h2></div><Link className="text-link" href="/catalog">Весь каталог <ArrowUpRight size={16} /></Link></div><div className="category-grid">{categories.slice(0, 6).map((category, index) => <CategoryCard key={category.name} category={category} index={index} />)}</div></section>

    <section className="selector-teaser"><div className="wrap selector-teaser-grid"><div><div className="section-kicker light">03 / PRODUCT SELECTOR</div><h2>Ищите не по памяти.<br /><em>Ищите по задаче.</em></h2><p>Выберите категорию, степень защиты, материал или размеры — и соберите короткий список подходящих позиций.</p><Link className="button button-light" href="/selector">Открыть подбор <ArrowRight size={17} /></Link></div><SelectorMini addToSpec={addToSpec} /></div></section>

    <section className="workflow-section wrap"><div className="section-heading-row"><div><div className="section-kicker">04 / B2B WORKFLOW</div><h2>От позиции к запросу</h2></div><span className="heading-note">Один понятный путь для закупщика <ArrowRight size={15} /></span></div><div className="workflow-line"><WorkflowStep number="01" icon={<Search size={18} />} title="Найти" text="Каталог и технический подбор" /><WorkflowStep number="02" icon={<Package size={18} />} title="Сравнить" text="Характеристики рядом" /><WorkflowStep number="03" icon={<ClipboardList size={18} />} title="Собрать" text="Спецификация с количеством" /><WorkflowStep number="04" icon={<FileText size={18} />} title="Запросить" text="Оптовое предложение" /></div><div className="workflow-cta"><div><span className="mono">СПЕЦИФИКАЦИЯ / DEMO</span><h3>Соберите несколько позиций<br />и передайте контекст менеджеру.</h3></div><Link className="button button-primary" href="/specification">Перейти к спецификации <ArrowRight size={17} /></Link></div></section>

    <section className="growth-section"><div className="wrap"><div className="section-heading-row"><div><div className="section-kicker light">05 / UX IMPROVEMENT</div><h2>Точки роста,<br /><em>которые можно показать.</em></h2></div><Link className="text-link light-link" href="/redesign">Вся концепция <ArrowUpRight size={16} /></Link></div><div className="growth-grid">{growthPoints.slice(0, 3).map((point) => <GrowthCard key={point.number} point={point} />)}</div></div></section>

    <section className="partner-teaser wrap"><div className="partner-teaser-card"><div className="partner-copy"><div className="section-kicker">06 / PARTNER AREA · DEMO</div><h2>Кабинет партнёра<br /><em>как следующий шаг.</em></h2><p>Концепция пространства, где можно держать запросы, спецификации, документы и профиль компании — без утверждения, что такая система уже существует.</p><Link className="button button-primary" href="/partner">Открыть DEMO <ArrowUpRight size={17} /></Link></div><div className="partner-preview"><div className="preview-top"><span className="mono">UPLAST / PARTNER AREA</span><span className="preview-status"><i /> CONCEPT</span></div><div className="preview-layout"><div className="preview-sidebar"><span className="selected"><Grid2X2 size={14} /> Обзор</span><span><ClipboardList size={14} /> Мои запросы</span><span><FileText size={14} /> Документы</span></div><div className="preview-main"><div className="preview-greeting">Добрый день, партнёр <span>→</span></div><div className="preview-cards"><div><small>ЗАПРОСЫ</small><b>—</b></div><div><small>СПЕЦИФИКАЦИИ</small><b>—</b></div></div><div className="preview-chart"><span>ПРОСТРАНСТВО ДЛЯ СОВМЕСТНОЙ РАБОТЫ</span><div className="chart-line" /></div></div></div></div></div></section>

    <section className="contact-strip"><div className="wrap contact-strip-inner"><div><div className="section-kicker">START WITH A CONVERSATION</div><h2>Нужно подобрать<br /><em>решение?</em></h2></div><div className="contact-strip-actions"><p>ООО «УралОмегаПласт»<br />info@u-plast.ru · +7 (34249) 3-63-00</p><Link className="button button-primary" href="/contacts">Контакты и реквизиты <ArrowRight size={17} /></Link></div></div></section>
  </main>;
}

function CategoryCard({ category, index }: { category: typeof categories[number]; index: number }) {
  const Icon = category.icon;
  return <Link href={`/catalog?category=${encodeURIComponent(category.name)}`} className="category-card"><div className="category-card-image"><img src={category.image} alt="" /><div className="category-index">0{index + 1}</div><div className="category-icon"><Icon size={18} /></div></div><div className="category-card-body"><h3>{category.name}</h3><p>{category.description}</p><span className="card-arrow"><ArrowUpRight size={16} /></span></div></Link>;
}

function WorkflowStep({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) {
  return <div className="workflow-step"><div className="step-top"><span className="mono">{number}</span><span className="step-icon">{icon}</span></div><h3>{title}</h3><p>{text}</p></div>;
}

function GrowthCard({ point }: { point: typeof growthPoints[number] }) {
  return <article className="growth-card"><div className="growth-number mono">{point.number}</div><div className="growth-row"><span>ПРОБЛЕМА</span><p>{point.problem}</p></div><div className="growth-arrow"><ArrowDownRight size={17} /></div><div className="growth-row"><span>ИЗМЕНЕНИЕ</span><p>{point.change}</p></div><div className="growth-result"><span>ПОЛЬЗОВАТЕЛЬ ПОЛУЧАЕТ</span><p>{point.result}</p></div></article>;
}

function CatalogPage({ addToSpec }: { addToSpec: (product: Product) => void }) {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const [search, setSearch] = useState("");
  const [ip, setIp] = useState("all");
  const [material, setMaterial] = useState("all");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("relevant");

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const query = search.toLowerCase();
      const matchesSearch = !query || `${product.name} ${product.article} ${product.tags.join(" ")}`.toLowerCase().includes(query);
      const matchesCategory = category === "all" || product.category === category;
      const matchesIp = ip === "all" || product.ip === ip;
      const matchesMaterial = material === "all" || product.material === material;
      return matchesSearch && matchesCategory && matchesIp && matchesMaterial;
    });
    if (sort === "name") return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, category, ip, material, sort]);

  const reset = () => { setSearch(""); setIp("all"); setMaterial("all"); setCategory("all"); };
  const activeCount = [category !== "all", ip !== "all", material !== "all", Boolean(search)].filter(Boolean).length;
  return <main className="subpage page-enter"><PageIntro kicker="CATALOG / NEW STRUCTURE" title={<>Каталог, который<br /><em>ведёт к выбору.</em></>} text="Реальные категории и названия Uplast, собранные в новую B2B-архитектуру: категория → подкатегория → список → карточка." action={<Link className="button button-primary" href="/selector">Подобрать по параметрам <SlidersHorizontal size={17} /></Link>} />
    <div className="wrap breadcrumb"><Link href="/">Главная</Link><ChevronRight size={14} /><span>Каталог</span></div>
    <section className="catalog-layout wrap"><aside className={`filter-panel ${filtersOpen ? "is-open" : ""}`}><div className="filter-head"><span className="mono">FILTERS / {activeCount}</span><button className="close-filter" onClick={() => setFiltersOpen(false)}><X size={18} /></button></div><FilterGroup label="Поиск"><div className="search-input"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Название или артикул" /></div></FilterGroup><FilterGroup label="Категория"><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Все категории</option>{categories.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select></FilterGroup><FilterGroup label="Степень защиты"><div className="filter-options">{["all", "IP30", "IP31", "IP41", "IP66"].map((value) => <button key={value} className={ip === value ? "selected" : ""} onClick={() => setIp(value)}>{value === "all" ? "Все" : value}<span>{value === "all" ? products.length : products.filter((p) => p.ip === value).length}</span></button>)}</div></FilterGroup><FilterGroup label="Материал"><select value={material} onChange={(e) => setMaterial(e.target.value)}><option value="all">Все материалы</option><option value="полипропилен">полипропилен</option><option value="полистирол">полистирол</option><option value="ПНД">ПНД</option></select></FilterGroup><button className="reset-button" onClick={reset}>Сбросить фильтры <X size={14} /></button></aside><div className="catalog-results"><div className="catalog-toolbar"><div><span className="mono">РЕЗУЛЬТАТЫ</span><h2>{filtered.length} <small>позиций</small></h2></div><div className="toolbar-actions"><button className="filter-toggle" onClick={() => setFiltersOpen(true)}><Filter size={15} /> Фильтры {activeCount > 0 && <b>{activeCount}</b>}</button><label className="sort-select">Сортировка <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="relevant">По релевантности</option><option value="name">По названию</option></select><ChevronDown size={14} /></label></div></div>{activeCount > 0 && <div className="active-filters"><span>Активные фильтры</span>{category !== "all" && <button onClick={() => setCategory("all")}>{category} <X size={13} /></button>}{ip !== "all" && <button onClick={() => setIp("all")}>{ip} <X size={13} /></button>}{material !== "all" && <button onClick={() => setMaterial("all")}>{material} <X size={13} /></button>}{search && <button onClick={() => setSearch("")}>«{search}» <X size={13} /></button>}</div>}<div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} addToSpec={addToSpec} />)}</div>{filtered.length === 0 && <EmptyState reset={reset} />}</div></section>
  </main>;
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) { return <div className="filter-group"><div className="filter-label">{label}</div>{children}</div>; }

function ProductCard({ product, addToSpec }: { product: Product; addToSpec: (product: Product) => void }) {
  return <article className="product-card"><Link href={`/product/${product.id}`} className="product-image"><img src={product.image || STORAGE_CATALOG} alt={product.name} /><span className="image-arrow"><ArrowUpRight size={16} /></span></Link><div className="product-card-body"><div className="product-card-meta"><span>{product.category}</span><span className="mono">{product.article}</span></div><Link href={`/product/${product.id}`}><h3>{product.name}</h3></Link><div className="product-chips">{product.ip && <span>{product.ip}</span>}{product.size && <span>{product.size}</span>}{product.material && <span>{product.material}</span>}</div><div className="product-card-footer"><Link className="details-link" href={`/product/${product.id}`}>Подробнее <ArrowRight size={14} /></Link><button className="add-icon-button" onClick={() => addToSpec(product)} aria-label="Добавить в спецификацию"><Plus size={17} /></button></div></div></article>;
}

function ProductPage({ addToSpec }: { addToSpec: (product: Product) => void }) {
  const [, params] = useRoute("/product/:id");
  const product = products.find((item) => item.id === params?.id) || products[0];
  return <main className="subpage page-enter"><div className="wrap breadcrumb"><Link href="/">Главная</Link><ChevronRight size={14} /><Link href="/catalog">Каталог</Link><ChevronRight size={14} /><span>{product.category}</span></div><section className="product-detail wrap"><div className="detail-image"><img src={product.image || STORAGE_CATALOG} alt={product.name} /><div className="detail-grid-mark mono">PRODUCT / {product.article}</div></div><div className="detail-copy"><span className="eyebrow"><span className="eyebrow-dot" /> PRODUCT DETAIL</span><div className="detail-category">{product.category} <ArrowRight size={14} /> {product.subcategory}</div><h1>{product.name}</h1><p className="detail-description">{product.description}</p><div className="detail-table"><DetailRow label="Артикул" value={product.article} /><DetailRow label="Единица измерения" value={product.unit} />{product.ip && <DetailRow label="Степень защиты" value={product.ip} />} {product.size && <DetailRow label="Размеры" value={product.size} />} {product.material && <DetailRow label="Материал" value={product.material} />} {product.color && <DetailRow label="Цвет корпуса" value={product.color} />}</div><div className="detail-actions"><button className="button button-primary" onClick={() => addToSpec(product)}>Добавить в спецификацию <Plus size={17} /></button><Link className="button button-ghost" href="/specification">Открыть спецификацию <ArrowUpRight size={17} /></Link></div><div className="detail-note"><Check size={16} /> Позиция добавляется без оформления заказа — только для оптового запроса.</div></div></section><section className="detail-bottom wrap"><div><span className="section-kicker">PRODUCT CONTEXT</span><h2>Характеристики<br /><em>рядом с действием.</em></h2></div><div className="detail-context"><p>В текущем сайте у продукции уже есть техническое описание, область применения и характеристики. В новой карточке они становятся частью рабочего сценария: пользователь может добавить позицию, изменить количество и отправить запрос с контекстом.</p><Link className="text-link" href="/selector">Попробовать подбор <ArrowRight size={15} /></Link></div></section></main>;
}

function DetailRow({ label, value }: { label: string; value: string }) { return <div className="detail-row"><span>{label}</span><strong>{value}</strong></div>; }

function SelectorPage({ addToSpec }: { addToSpec: (product: Product) => void }) {
  const [category, setCategory] = useState("Боксы пластиковые");
  const [ip, setIp] = useState("all");
  const [size, setSize] = useState("all");
  const result = products.filter((product) => product.category === category && (ip === "all" || product.ip === ip) && (size === "all" || product.size === size));
  const sizes = Array.from(new Set(products.filter((product) => product.category === category && product.size).map((product) => product.size as string)));
  const reset = () => { setCategory("Боксы пластиковые"); setIp("all"); setSize("all"); };
  return <main className="subpage page-enter"><PageIntro kicker="PRODUCT SELECTOR / TECHNICAL PICKER" title={<>Подбор по<br /><em>параметрам.</em></>} text="Сценарий для закупщика, который помнит требования к изделию, но не помнит артикул. Параметры здесь основаны на реальных полях каталога Uplast." action={<Link className="button button-ghost" href="/catalog">Вернуться в каталог <ArrowLeft size={17} /></Link>} /><section className="selector-layout wrap"><div className="selector-form-card"><div className="selector-card-top"><span className="mono">STEP 01—03</span><span className="selector-live"><i /> LIVE FILTER</span></div><h2>Соберите требования</h2><p>Выберите категорию и параметры — результаты обновятся сразу.</p><div className="selector-fields"><SelectorField label="Категория"><select value={category} onChange={(e) => { setCategory(e.target.value); setSize("all"); }}><option>Боксы пластиковые</option><option>Коробка электромонтажная</option><option>Аксессуары</option><option>Труба гладкая</option></select></SelectorField><SelectorField label="Степень защиты"><select value={ip} onChange={(e) => setIp(e.target.value)}><option value="all">Выберите параметр</option><option value="IP30">IP30</option><option value="IP31">IP31</option><option value="IP41">IP41</option><option value="IP66">IP66</option></select></SelectorField><SelectorField label="Размеры"><select value={size} onChange={(e) => setSize(e.target.value)}><option value="all">Выберите значение</option>{sizes.map((item) => <option key={item}>{item}</option>)}</select></SelectorField></div><div className="selector-form-actions"><button className="button button-primary" onClick={() => toast.success(`Найдено позиций: ${result.length}`)}>Показать результаты <ArrowRight size={17} /></button><button className="text-button" onClick={reset}>Сбросить</button></div></div><div className="selector-result-card"><div className="selector-result-head"><div><span className="mono">MATCHING RESULTS</span><h2>{result.length}<small> позиции</small></h2></div><div className="result-pulse"><span /><span /><span /></div></div><div className="selector-results">{result.slice(0, 4).map((product) => <div className="selector-product" key={product.id}><div className="selector-product-image"><img src={product.image || STORAGE_CATALOG} alt="" /></div><div className="selector-product-copy"><span className="mono">{product.article}</span><h3>{product.name}</h3><div className="product-chips">{product.ip && <span>{product.ip}</span>}{product.size && <span>{product.size}</span>}</div></div><button className="add-icon-button" onClick={() => addToSpec(product)} aria-label="Добавить в спецификацию"><Plus size={17} /></button></div>)}{result.length === 0 && <div className="selector-empty"><HelpCircle size={20} /><p>Для этой комбинации позиций не найдено.<br /><button onClick={reset}>Сбросить параметры</button></p></div>}</div><Link className="selector-all-link" href="/catalog">Открыть все результаты <ArrowUpRight size={15} /></Link></div></section><section className="selector-explainer wrap"><div className="explainer-diagram"><div className="diagram-box">КАТЕГОРИЯ</div><ChevronRight /><div className="diagram-box">ПАРАМЕТР</div><ChevronRight /><div className="diagram-box active">РЕЗУЛЬТАТ</div></div><div><span className="section-kicker">WHY IT MATTERS</span><h2>Меньше поиска.<br /><em>Больше уверенности.</em></h2><p>Это не отдельный калькулятор. Это новая точка входа в каталог — особенно для оптового пользователя, который работает с техническими требованиями.</p></div></section></main>;
}

function SelectorField({ label, children }: { label: string; children: React.ReactNode }) { return <label className="selector-field"><span>{label}</span><div>{children}<ChevronDown size={15} /></div></label>; }

function SelectorMini({ addToSpec }: { addToSpec: (product: Product) => void }) { const [selected, setSelected] = useState("IP30"); const matches = products.filter((product) => product.category === "Боксы пластиковые" && product.ip === selected); return <div className="selector-mini"><div className="mini-head"><span className="mono">LIVE FILTER / БОКСЫ</span><span>{matches.length} найдено</span></div><div className="mini-options">{["IP30", "IP31", "IP41"].map((item) => <button key={item} className={selected === item ? "active" : ""} onClick={() => setSelected(item)}>{item}<span>{products.filter((p) => p.ip === item).length}</span></button>)}</div><div className="mini-result">{matches.slice(0, 2).map((item) => <div key={item.id}><img src={item.image || STORAGE_CATALOG} alt="" /><span>{item.name}</span><button onClick={() => addToSpec(item)} aria-label="Добавить"><Plus size={14} /></button></div>)}</div><Link href="/selector" className="mini-footer">Открыть подбор <ArrowRight size={14} /></Link></div>; }

function SpecificationPage({ spec, updateQty, removeFromSpec, clearSpec }: { spec: SpecItem[]; updateQty: (id: string, delta: number) => void; removeFromSpec: (id: string) => void; clearSpec: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  return <main className="subpage page-enter"><PageIntro kicker="SPECIFICATION / B2B FLOW" title={<>Спецификация<br /><em>к запросу.</em></>} text="Здесь собраны выбранные позиции, характеристики и количество — чтобы оптовый запрос начинался с понятного контекста." action={<Link className="button button-ghost" href="/catalog">Добавить ещё <Plus size={17} /></Link>} /><section className="spec-layout wrap"><div className="spec-list-card"><div className="spec-card-head"><div><span className="mono">YOUR SPECIFICATION</span><h2>{spec.length} <small>позиций</small></h2></div>{spec.length > 0 && <button className="text-button danger" onClick={clearSpec}>Очистить список</button>}</div>{spec.length === 0 ? <div className="spec-empty"><div className="empty-icon"><ClipboardList size={24} /></div><h3>Спецификация пока пуста</h3><p>Добавьте продукцию из каталога или технического подбора, чтобы показать менеджеру состав запроса.</p><Link className="button button-primary" href="/catalog">Открыть каталог <ArrowRight size={17} /></Link></div> : <div className="spec-items">{spec.map((item) => <div className="spec-item" key={item.id}><div className="spec-item-image"><img src={item.image || STORAGE_CATALOG} alt="" /></div><div className="spec-item-copy"><span className="mono">{item.article} · {item.unit}</span><h3>{item.name}</h3><div className="product-chips">{item.ip && <span>{item.ip}</span>}{item.size && <span>{item.size}</span>}{item.material && <span>{item.material}</span>}</div></div><div className="qty-control"><button onClick={() => updateQty(item.id, -1)} aria-label="Уменьшить"><Minus size={14} /></button><b>{item.qty}</b><button onClick={() => updateQty(item.id, 1)} aria-label="Увеличить"><Plus size={14} /></button></div><button className="remove-item" onClick={() => removeFromSpec(item.id)} aria-label="Удалить позицию"><X size={17} /></button></div>)}</div>}</div><div className="quote-card"><div className="quote-card-top"><span className="mono">REQUEST FOR QUOTE</span><FileText size={19} /></div><h2>Запросить<br /><em>оптовое предложение.</em></h2><p>Оставьте контакты — менеджер увидит состав спецификации и сможет вернуться с предложением.</p><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success("Запрос подготовлен", { description: "Это демонстрационный сценарий — данные никуда не отправляются." }); }}><label>Имя и фамилия<input required placeholder="Как к вам обращаться" /></label><label>Компания<input required placeholder="Название компании" /></label><label>Рабочий e-mail<input type="email" required placeholder="name@company.ru" /></label><label>Комментарий<textarea placeholder="Дополнительные требования или вопрос" rows={3} /></label><button className="button button-light full-width" disabled={spec.length === 0}>{submitted ? <><Check size={16} /> Запрос подготовлен</> : <>Отправить запрос <ArrowRight size={17} /></>}</button></form><div className="quote-privacy"><ShieldCheck size={14} /> Демонстрационная форма без реальной отправки</div></div></section></main>;
}

function PartnerPage() {
  const [tab, setTab] = useState("Обзор");
  const tabs = ["Обзор", "Мои запросы", "Мои спецификации", "Документы", "Профиль компании"];
  return <main className="subpage page-enter"><PageIntro kicker="PARTNER AREA / CONCEPT" title={<>Кабинет<br /><em>партнёра.</em></>} text="Возможная структура будущего рабочего пространства для B2B-партнёра. Раздел обозначен как CONCEPT — это не утверждение о существующей системе." action={<Link className="button button-primary" href="/specification">Перейти к спецификации <ArrowRight size={17} /></Link>} /><section className="partner-dashboard wrap"><aside className="dashboard-sidebar"><div className="dashboard-brand"><img src={STORAGE_LOGO} alt="Uplast" /><span className="partner-badge">CONCEPT</span></div><div className="dashboard-company"><div className="company-avatar">К</div><div><b>Компания партнёра</b><span>Рабочее пространство</span></div></div><div className="dashboard-nav">{tabs.map((item, index) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{index === 0 ? <Grid2X2 size={15} /> : index === 1 ? <ClipboardList size={15} /> : index === 2 ? <FileText size={15} /> : index === 3 ? <ShieldCheck size={15} /> : <UserRound size={15} />}{item}{tab === item && <ChevronRight size={14} />}</button>)}</div><div className="dashboard-sidebar-foot"><span className="mono">UPLAST / B2B</span><span>CONCEPT ONLY</span></div></aside><div className="dashboard-main"><div className="dashboard-top"><div><span className="mono">PARTNER AREA · {tab.toUpperCase()}</span><h2>{tab === "Обзор" ? <>Добрый день,<br /><em>партнёр.</em></> : tab}</h2></div><div className="dashboard-top-actions"><span className="dashboard-live"><i /> CONCEPT</span><button className="avatar-button">К</button></div></div>{tab === "Обзор" ? <PartnerOverview /> : <PartnerPlaceholder tab={tab} />}</div></section></main>;
}

function PartnerOverview() { return <><div className="dashboard-stat-grid"><div><span>МОИ ЗАПРОСЫ</span><b>—</b><small>Будут отображаться здесь</small></div><div><span>СПЕЦИФИКАЦИИ</span><b>—</b><small>Состав и количество позиций</small></div><div><span>ДОКУМЕНТЫ</span><b>—</b><small>Сертификаты и материалы</small></div></div><div className="dashboard-content-grid"><div className="dashboard-panel"><div className="panel-heading"><h3>Последние действия</h3><span className="mono">ACTIVITY</span></div><div className="dashboard-empty"><Sparkles size={18} /><p>Здесь появится история работы<br /><span>с запросами и спецификациями</span></p></div></div><div className="dashboard-panel accent-panel"><div className="panel-heading"><h3>Быстрый старт</h3><span className="mono">NEXT STEP</span></div><p>Соберите спецификацию из каталога, чтобы передать менеджеру понятный состав запроса.</p><Link className="text-link" href="/catalog">Открыть каталог <ArrowUpRight size={15} /></Link></div></div></>; }
function PartnerPlaceholder({ tab }: { tab: string }) { return <div className="dashboard-panel large-placeholder"><div className="dashboard-empty"><Layers3 size={21} /><h3>{tab}</h3><p>Структура раздела показана как концепция будущего кабинета.<br />Сущности и состояния можно обсудить на следующем этапе.</p><Link className="text-link" href="/contacts">Обсудить сценарий <ArrowRight size={15} /></Link></div></div>; }

function RedesignPage() { return <main className="subpage page-enter"><PageIntro kicker="REDESIGN CONCEPT / SALES STORY" title={<>Не просто новый вид.<br /><em>Новый способ работать.</em></>} text="Четыре наблюдаемые точки роста и два примера интерфейса, которые помогают объяснить ценность новой цифровой архитектуры." action={<Link className="button button-primary" href="/catalog">Пощёлкать каталог <ArrowRight size={17} /></Link>} /><section className="growth-detail-section wrap"><div className="section-heading-row"><div><div className="section-kicker">OBSERVATIONS → CHANGES</div><h2>Точки роста</h2></div><span className="heading-note">Что можно рассказать на встрече <ArrowRight size={15} /></span></div><div className="growth-detail-grid">{growthPoints.map((point) => <GrowthCard key={point.number} point={point} />)}</div></section><section className="interface-section"><div className="wrap"><div className="section-heading-row"><div><div className="section-kicker light">UX IMPROVEMENT / 01</div><h2>Новая структура<br /><em>каталога.</em></h2></div><span className="heading-note light-note">Old flow → new flow</span></div><div className="flow-compare"><div className="flow-old"><span className="mono">CURRENT ENTRY</span><div className="old-screen"><div className="old-header"><span>УралОмегаПласт</span><span>Продукция</span></div><div className="old-body"><div className="old-sidebar"><span>Продукция</span><span>Услуги</span><span>Вторсырьё</span></div><div className="old-list"><b>Наша продукция</b><span>Боксы пластиковые</span><span>Коробка электромонтажная</span><span>Труба гладкая</span><span>...</span></div></div></div><div className="flow-caption"><span>Список категорий</span><p>Пользователь видит ассортимент, но следующий шаг не всегда очевиден.</p></div></div><div className="flow-arrow"><ArrowRight size={25} /></div><div className="flow-new"><span className="mono">NEW STRUCTURE</span><div className="new-screen"><div className="new-header"><span>КАТАЛОГ / БОКСЫ</span><span>IP30 · 6 позиций</span></div><div className="new-body"><div className="new-crumb">Главная / Каталог / Боксы пластиковые / Наружная установка</div><div className="new-main"><div className="new-filters"><span>ФИЛЬТРЫ</span><i>Степень защиты</i><i>Материал</i><i>Размеры</i></div><div className="new-results"><b>Подходящие позиции</b><div className="new-product-line"><img src={STORAGE_CATALOG} alt="" /><span>Бокс для автоматических выключателей</span><button><Plus size={12} /></button></div><div className="new-product-line"><img src={STORAGE_POPULAR} alt="" /><span>Бокс для наружной установки</span><button><Plus size={12} /></button></div></div></div></div></div><div className="flow-caption"><span>Каталог как рабочий инструмент</span><p>Breadcrumbs, фильтры, характеристики и действие собраны в одном экране.</p></div></div></div></div></section><section className="interface-section light-interface"><div className="wrap"><div className="section-heading-row"><div><div className="section-kicker">UX IMPROVEMENT / 02</div><h2>Карточка, которая<br /><em>продолжает путь.</em></h2></div><span className="heading-note">Product detail → specification</span></div><div className="detail-compare"><div className="detail-before"><span className="mono">PRODUCT DETAIL / BEFORE</span><div className="before-card"><div className="before-image"><img src={STORAGE_HERO} alt="" /></div><div><span className="mono">030-070</span><h3>Коробка распаячная двухкомпонентная для прямого монтажа 80х80х40</h3><p>Описание</p><p>Характеристики</p></div></div></div><div className="compare-arrow"><ArrowRight size={25} /></div><div className="detail-after"><span className="mono">PRODUCT DETAIL / NEW</span><div className="after-card"><div className="after-image"><img src={STORAGE_HERO} alt="" /></div><div><span className="mono">030-070 · IP66</span><h3>Коробка распаячная двухкомпонентная для прямого монтажа 80х80х40</h3><div className="after-specs"><span>HF-безгалогенный</span><span>Пыль и влага</span><span>Прямой монтаж</span></div><button>Добавить в спецификацию <Plus size={14} /></button></div></div></div></div><div className="callout-row"><div><Check size={17} /><span>Характеристики в зоне решения</span></div><div><Check size={17} /><span>CTA для оптового сценария</span></div><div><Check size={17} /><span>Контекст не теряется</span></div></div></div></section></main>; }

function ContactsPage() { return <main className="subpage page-enter"><PageIntro kicker="CONTACTS / COMPANY" title={<>Давайте обсудим<br /><em>следующий шаг.</em></>} text="Контактная информация ООО «УралОмегаПласт» из текущего сайта — без изменения формулировок и реквизитов." action={<a className="button button-primary" href="mailto:info@u-plast.ru">Написать на e-mail <ArrowUpRight size={17} /></a>} /><section className="contacts-grid wrap"><div className="contact-card"><span className="mono">ООО «УРАЛОМЕГАПЛАСТ»</span><h2>Производственная<br /><em>база и офис.</em></h2><div className="contact-list"><div><span>Адрес</span><p>618900, Пермский край,<br />г. Лысьва, ул. Революции, 5</p></div><div><span>Телефоны</span><p><a href="tel:+73424936300">+7 (34249) 3-63-00</a><br />3-63-01, 3-63-02</p></div><div><span>E-mail</span><p><a href="mailto:info@u-plast.ru">info@u-plast.ru</a></p></div></div></div><div className="contact-card dark-contact"><span className="mono">ПРОИЗВОДСТВЕННАЯ БАЗА</span><h2>Отгрузка и<br /><em>доставка.</em></h2><div className="contact-list"><div><span>Адрес</span><p>618900, Пермский край,<br />г. Лысьва, ул. Революции, 67</p></div><div><span>Телефоны</span><p>+7 (34249) 5-46-48<br />5-46-49, 5-46-20</p></div></div><div className="contact-dark-note"><Truck size={18} /> Собственный автопарк и доставка до места — по информации текущего сайта.</div></div></section></main>; }

function PageIntro({ kicker, title, text, action }: { kicker: string; title: React.ReactNode; text: string; action: React.ReactNode }) { return <section className="page-intro wrap"><div className="page-intro-copy"><div className="section-kicker">{kicker}</div><h1>{title}</h1><p>{text}</p><div className="page-intro-actions">{action}</div></div><div className="page-intro-marker"><div className="marker-ring"><span>UP</span></div><span className="mono">SYSTEM / UPLAST</span></div></section>; }
function EmptyState({ reset }: { reset: () => void }) { return <div className="empty-results"><Search size={20} /><h3>Ничего не найдено</h3><p>Попробуйте убрать один из фильтров или изменить запрос.</p><button className="text-button" onClick={reset}>Сбросить и посмотреть всё</button></div>; }
function NotFoundPage() { return <main className="not-found wrap"><span className="mono">404 / NOT FOUND</span><h1>Такой страницы<br /><em>пока нет.</em></h1><Link className="button button-primary" href="/">Вернуться на главную <ArrowLeft size={17} /></Link></main>; }

export default App;
