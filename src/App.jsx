import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle,
  FileArrowUp,
  FileText,
  List,
  LockKey,
  MapPin,
  PaperPlaneTilt,
  Phone,
  X,
} from "@phosphor-icons/react";

const phoneDisplay = "+7 (989) 268-29-32";
const phoneDigits = "79892682932";
const email = "olyshka55@mail.ru";
const telegramHandle = "Olga_Potolitsyna";

const navItems = [
  ["Услуги", "#services"],
  ["Для кого", "#audience"],
  ["Как работаю", "#process"],
  ["Обо мне", "#about"],
];

const audience = [
  {
    number: "01",
    title: "Девелоперы и УК",
    text: "ТЦ, БЦ и складские комплексы. Помогаю держать бюджет под контролем на каждом этапе.",
  },
  {
    number: "02",
    title: "Субподрядчики",
    text: "Сметы для тендеров сетей и государства. Сверяю объёмы, расценки и требования заказчика.",
  },
  {
    number: "03",
    title: "Подрядчики по 44-ФЗ",
    text: "Документы для школ, больниц и социальных объектов, которые готовы к экспертизе и проверке.",
  },
];

const services = [
  {
    index: "Составление",
    title: "Смета под ключ",
    text: "Локальные сметы, дефектные ведомости и коммерческие предложения в Гранд-Смете и Турбо-Сметчике.",
    result: "На выходе: документ для согласования заказчиком с первого раза.",
  },
  {
    index: "Аудит",
    title: "Проверка готовой сметы",
    text: "Нахожу завышения, ошибки в коэффициентах и несоответствия нормативам до того, как они станут переплатой.",
    result: "На выходе: ясный список правок и экономия до 10-15% бюджета.",
  },
  {
    index: "Сопровождение",
    title: "Договоры и приёмка",
    text: "Контроль КС-2, КС-3, ЭДО и работы подрядчиков на всех этапах проекта.",
    result: "На выходе: спокойная приёмка без лишних объёмов и срывов сроков.",
  },
  {
    index: "Экспертиза",
    title: "Подготовка к суду",
    text: "Собираю документы и расчёты для арбитража. Есть опыт защиты смет в судебных экспертизах.",
    result: "На выходе: обоснованная позиция, которую можно защищать документами.",
  },
];

const process = [
  ["Слушаю задачу", "Вы присылаете смету, ТЗ или исходные данные. Я уточняю объём и срок."],
  ["Нахожу риски", "Проверяю нормативы, объёмы, коэффициенты и требования конкретного заказчика."],
  ["Собираю решение", "Фиксирую результат в понятном документе, который удобно согласовывать и защищать."],
  ["Остаюсь на связи", "Подключаюсь к вопросам по договорам, приёмке и изменениям проекта."],
];

const priceRows = [
  ["Смета под ключ", "от 40 000 ₽"],
  ["Проверка сметы", "от 10 000 ₽"],
  ["Судебная экспертиза", "договорная"],
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Ольга Потолицына, на главную">
      <span className="logo-mark">О</span>
      <span className="logo-type">
        <strong>Потолиц<span>ы</span>на</strong>
        <small>инженер-сметчик</small>
      </span>
    </a>
  );
}

function SectionHeading({ children, text, id, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`}>
      <h2 id={id}>{children}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleFormChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (formState !== "idle") setFormState("idle");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = [
      "Здравствуйте, Ольга! Хочу получить экспресс-оценку сметы.",
      form.name && `Имя: ${form.name}`,
      form.phone && `Телефон: ${form.phone}`,
      form.message && `Комментарий: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://t.me/${telegramHandle}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormState("sent");
  };

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Основная навигация">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="nav-phone" href={`tel:+${phoneDigits}`}><Phone size={16} weight="bold" />{phoneDisplay}</a>
          </nav>
          <div className="header-actions">
            <a className="button button--dark button--small" href="#contact">Проверить смету</a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section-frame" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Инженер-сметчик / Краснодар и дистанционно</p>
              <h1 id="hero-title">Сметы, которые проходят<br />любые проверки.</h1>
              <p className="hero-lede">16 лет опыта. Работа с Магнитом, Пятерочкой, Чижиком и госзаказчиками. Закрыто проектов на 2,5 млрд рублей.</p>
              <div className="hero-actions">
                <a className="button button--accent" href="#contact">Проверить смету за 15 минут <ArrowRight size={18} weight="bold" /></a>
                <a className="text-link" href="#services">Посмотреть услуги <ArrowDown size={16} /></a>
              </div>
              <div className="hero-proof" aria-label="Ключевые показатели">
                <div><strong>16</strong><span>лет в сметах</span></div>
                <div><strong>2,5 млрд</strong><span>рублей в проектах</span></div>
                <div><strong>10-15%</strong><span>экономии бюджета</span></div>
              </div>
            </div>
            <div className="hero-visual" data-reveal>
              <div className="hero-image-wrap">
                <img src="/images/hero-estimator.png" alt="Инженер-сметчик за проверкой проектной документации" width="1600" height="900" />
                <div className="hero-stamp"><span>КС-2</span><span>КС-3</span><span>44-ФЗ</span></div>
              </div>
              <p className="image-note">Точность в документах. Спокойствие в проекте.</p>
            </div>
          </div>
        </section>

        <section className="proof-strip">
          <div className="container proof-strip-inner">
            <p>Проверяю смету до того, как она станет проблемой</p>
            <a className="inline-arrow" href="#contact">Отправить файл на оценку <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="section section--audience" id="audience" aria-labelledby="audience-title">
          <div className="container">
            <SectionHeading id="audience-title" text="Требования у каждого проекта свои. Я учитываю не только объект, но и конкретного заказчика, его нормы и способ проверки.">Работаю там, где ошибка стоит дорого.</SectionHeading>
            <div className="audience-grid" data-reveal>
              {audience.map((item) => (
                <article className="audience-item" key={item.number}>
                  <span className="item-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ArrowRight className="item-arrow" size={20} weight="bold" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--services" id="services" aria-labelledby="services-title">
          <div className="container">
            <SectionHeading id="services-title" text="От первого расчёта до приёмки. Подключаюсь на нужном этапе и держу в фокусе конечный результат.">Что можно поручить мне</SectionHeading>
            <div className="services-list" data-reveal>
              {services.map((service) => (
                <article className="service-row" key={service.title}>
                  <span className="service-index">{service.index}</span>
                  <div className="service-main"><h3>{service.title}</h3><p>{service.text}</p></div>
                  <div className="service-result"><Check size={17} weight="bold" /><span>{service.result}</span></div>
                  <ArrowRight className="service-arrow" size={22} weight="bold" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--evidence" id="about" aria-labelledby="about-title">
          <div className="container evidence-grid">
            <div className="evidence-image" data-reveal>
              <img src="/images/estimate-desk.png" alt="Рабочие материалы для проверки строительной сметы" width="1120" height="1400" loading="lazy" />
              <div className="evidence-caption"><span>Ольга Потолицына</span><span>Инженер ПГС</span></div>
            </div>
            <div className="evidence-copy" data-reveal>
              <p className="eyebrow">Обо мне</p>
              <h2 id="about-title">Я отвечаю за результат лично.</h2>
              <p className="lead-paragraph">Ольга Потолицына, инженер-сметчик с 16-летним стажем. Специализация: коммерческая недвижимость, социальная инфраструктура и госзаказ.</p>
              <div className="evidence-list">
                <div><CheckCircle size={22} weight="fill" /><span>Работала с федеральными сетями: Магнит, Пятерочка, Чижик.</span></div>
                <div><CheckCircle size={22} weight="fill" /><span>Участвовала в строительстве знаковых объектов, включая Академический театр драмы им. В. Савина и Республиканский лыжный комплекс им. Р. Сметаниной.</span></div>
                <div><CheckCircle size={22} weight="fill" /><span>Документы выдерживают судебные экспертизы и проверки заказчиков.</span></div>
              </div>
              <a className="button button--outline" href={`mailto:${email}`}>Задать вопрос <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section section--process" id="process" aria-labelledby="process-title">
          <div className="container process-layout">
            <div className="process-intro" data-reveal>
              <p className="eyebrow">Как работаю</p>
              <h2 id="process-title">Чётко от задачи до документа.</h2>
              <p>Первый шаг простой: пришлите готовую смету, ТЗ или коротко опишите ситуацию. Я скажу, что можно проверить и какой результат вы получите.</p>
              <a className="inline-arrow" href="#contact">Обсудить задачу <ArrowRight size={17} /></a>
            </div>
            <div className="process-list" data-reveal>
              {process.map(([title, text], index) => (
                <div className="process-step" key={title}>
                  <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--price" id="price" aria-labelledby="price-title">
          <div className="container price-grid">
            <div className="price-copy" data-reveal>
              <p className="eyebrow">Стоимость</p>
              <h2 id="price-title">Сначала ясность. Потом точная цена.</h2>
              <p>Стоимость зависит от объёма документации, количества разделов и срока. После короткой оценки я называю цену и фиксирую её до начала работы.</p>
              <div className="price-note"><LockKey size={18} /><span>Без скрытых доплат по ходу проекта</span></div>
            </div>
            <div className="price-table" data-reveal>
              {priceRows.map(([label, price]) => <div className="price-row" key={label}><span>{label}</span><strong>{price}</strong></div>)}
              <div className="price-table-foot">Точная цена после оценки объёма. Экспресс-оценка сметы бесплатна.</div>
            </div>
          </div>
        </section>

        <section className="section section--contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-shell">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow">Первый шаг</p>
              <h2 id="contact-title">Пришлите смету. Я скажу, где её усилить.</h2>
              <p>Проверю файл за 15 минут и подскажу, что важно поправить до подачи заказчику, на тендер или в суд.</p>
              <div className="contact-links">
                <a href={`tel:+${phoneDigits}`}><Phone size={18} weight="bold" /><span>{phoneDisplay}</span></a>
                <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noreferrer"><PaperPlaneTilt size={18} weight="bold" /><span>@{telegramHandle}</span></a>
                <a href={`mailto:${email}`}><FileText size={18} weight="bold" /><span>{email}</span></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} data-reveal>
              <div className="form-topline"><span>Экспресс-оценка</span><FileArrowUp size={20} /></div>
              <label>Имя<input name="name" value={form.name} onChange={handleFormChange} placeholder="Как к вам обращаться" required /></label>
              <label>Телефон<input name="phone" type="tel" value={form.phone} onChange={handleFormChange} placeholder="+7 900 000 00 00" required /></label>
              <label>Что нужно проверить?<textarea name="message" value={form.message} onChange={handleFormChange} placeholder="Коротко опишите проект или прикрепите файл в Telegram" rows="4" required /></label>
              <button className="button button--accent form-submit" type="submit">Отправить в Telegram <PaperPlaneTilt size={18} weight="bold" /></button>
              <p className="form-hint">Нажимая кнопку, вы откроете Telegram с уже подготовленным сообщением.</p>
              {formState === "sent" && <p className="form-success" role="status">Сообщение подготовлено. Если Telegram не открылся, напишите напрямую: @{telegramHandle}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <Logo />
          <p>Коммерческие и государственные строительные проекты. Работаю дистанционно по всей России.</p>
          <div className="footer-meta"><a href={`tel:+${phoneDigits}`}>{phoneDisplay}</a><span><MapPin size={15} /> Краснодар</span></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Ольга Потолицына</span><span>Инженер-сметчик</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
