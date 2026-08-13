import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  EnvelopeSimple,
  FileText,
  List,
  MapPin,
  Phone,
  ShieldCheck,
  TelegramLogo,
  X,
} from "@phosphor-icons/react";

const phoneDisplay = "+7 (989) 268-29-32";
const phoneDigits = "79892682932";
const email = "smeta_skd@mail.ru";
const telegramHandle = "Olga_Potolitsyna";
const maxUrl = "https://max.ru/u/f9LHodD0cOI_G2sVZ8gKxhe-DnUjMUCJzj084chXgs36UZwrQC-z7J9T99o";

const navItems = [
  ["Услуги", "#services"],
  ["Для кого", "#audience"],
  ["Как работаю", "#process"],
  ["Обо мне", "#about"],
  ["Стоимость", "#price"],
  ["Контакты", "#contact"],
];

const services = [
  {
    number: "01",
    icon: Calculator,
    title: "Смета под ключ",
    text: "Локальные сметы, дефектные ведомости и коммерческие предложения в формах ритейла: Пятёрочка, Чижик, Магнит и другие. Работаю в Гранд-Смете.",
    note: "от 40 000 ₽",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Аудит готовой сметы",
    text: "Проверка объёмов, расценок, коэффициентов и нормативов до согласования или оплаты работ.",
    note: "от 10 000 ₽",
  },
  {
    number: "03",
    icon: FileText,
    title: "КС-2, КС-3 и ЭДО",
    text: "Сопровождение договоров, исполнительных документов и работы подрядчиков на всех этапах проекта.",
    note: "по задаче",
  },
];

const stats = [
  ["> 16", "лет в сметном деле"],
  ["2,5 млрд ₽", "стоимость проектов"],
  ["10-15%", "экономии после аудита"],
  ["1-2 дня", "согласование сметы"],
];

const audiences = [
  ["Девелоперы и управляющие компании", "Торговые центры, бизнес-центры и склады. Контроль бюджета от расчёта до приёмки."],
  ["Подрядчики и субподрядчики", "Тендерные расчёты и документы с учётом требований конкретного заказчика."],
  ["Государственные заказчики", "Школы, больницы и социальные объекты. Работа по требованиям заказчика."],
];

const process = [
  ["Получаю исходные данные", "Смета, ТЗ, чертежи или короткое описание задачи."],
  ["Проверяю риски", "Сверяю объёмы, нормативы, коэффициенты и требования заказчика."],
  ["Собираю решение", "Фиксирую правки и выпускаю понятный документ для согласования."],
  ["Защищаю результат", "Отвечаю на вопросы по приёмке, договорам и изменениям проекта."],
];

const priceRows = [
  ["Проверка готовой сметы", "от 10 000 ₽"],
  ["Смета под ключ", "от 40 000 ₽"],
];

function App() {
  const heroRef = useRef(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    if (!heroRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderSolid(!entry.isIntersecting),
      { rootMargin: "-82px 0px 0px", threshold: 0 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.classList.toggle("menu-is-open", menuOpen);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-is-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleFormChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (formState !== "idle") setFormState("idle");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const channel = event.nativeEvent.submitter?.value || "telegram";
    const message = [
      "Здравствуйте, Ольга! Хочу получить экспресс-оценку сметы.",
      form.name && `Имя: ${form.name}`,
      form.phone && `Телефон: ${form.phone}`,
      form.message && `Комментарий: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      channel === "max"
        ? maxUrl
        : `https://t.me/${telegramHandle}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setFormState(channel);
  };

  return (
    <div className="site-shell" id="top">
      <header className={`site-header${headerSolid || menuOpen ? " site-header--solid" : ""}`}>
        <div className="header-grid">
          <a className="header-descriptor" href="#top" aria-label="Ольга Потолицына, на главную">
            <img className="brand-logo" src="/images/olga-logo.png" alt="" width="68" height="68" />
            <span>Сметное сопровождение<br />строительных проектов</span>
          </a>
          <a className="header-name" href="#top">Ольга Потолицына</a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={25} /> : <List size={27} />}
          </button>
        </div>
      </header>

      <aside className={`site-menu${menuOpen ? " site-menu--open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu-layout">
          <nav className="menu-nav" aria-label="Основная навигация">
            {navItems.map(([label, href], index) => (
              <a href={href} key={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                <span>{String(index + 1).padStart(2, "0")}</span>{label}
              </a>
            ))}
          </nav>
          <div className="menu-contacts">
            <p>Обсудить задачу</p>
            <a href={`tel:+${phoneDigits}`}>{phoneDisplay}</a>
            <a className="menu-social-link" href={maxUrl} target="_blank" rel="noreferrer">
              <span className="social-icon max-social-icon" aria-hidden="true" />
              <span>MAX</span>
            </a>
            <a className="menu-social-link" href={`https://t.me/${telegramHandle}`} target="_blank" rel="noreferrer">
              <TelegramLogo className="social-icon" size={20} weight="fill" aria-hidden="true" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </aside>

      <main>
        <section className="hero" ref={heroRef} aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/hero-office.jpg"
            alt="Современный строительный объект и проектная документация"
            width="1672"
            height="936"
            fetchPriority="high"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-kicker">Инженер-сметчик / частная практика</p>
            <h1 id="hero-title">
              <span>точные и защищённые</span>
              <span>строительные сметы</span>
            </h1>
            <div className="hero-bottom">
              <div className="hero-action">
                <p>Расчёт, проверка и сопровождение</p>
                <a className="button button--light" href="#contact">Проверить смету <ArrowRight size={17} /></a>
              </div>
              <div className="hero-stat">
                <strong>&gt; 16</strong>
                <span>лет профессиональной практики</span>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="container" data-reveal>
            <h2 id="manifesto-title">
              Подготавливаю сметы, которые проходят <span>согласование</span>, <span>экспертизу</span> и <span>проверку заказчика</span>.
            </h2>
          </div>
        </section>

        <section className="proof" aria-label="Опыт и результаты">
          <div className="container">
            <div className="proof-heading" data-reveal>
              <p>Результат в цифрах</p>
              <p>Опыт работы с федеральными сетями и государственными заказчиками</p>
            </div>
            <div className="proof-grid" data-reveal>
              {stats.map(([value, label]) => (
                <div className="proof-item" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="client-line" data-reveal>Магнит <span>/</span> Пятерочка <span>/</span> Чижик <span>/</span> коммерческая недвижимость <span>/</span> социальные объекты</p>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="section-label">Что можно поручить</p>
              <h2 id="services-title">Считаю. Проверяю.<br />Защищаю результат.</h2>
            </div>
            <div className="services-grid" data-reveal>
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-item" key={service.title}>
                    <div className="service-meta"><span>{service.number}</span><Icon size={28} weight="light" /></div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span className="service-note">{service.note}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section projects" id="audience" aria-labelledby="projects-title">
          <div className="container">
            <div className="projects-heading" data-reveal>
              <p className="section-label">Проекты и задачи</p>
              <h2 id="projects-title">Подключаюсь там, где цена ошибки особенно высока</h2>
            </div>
            <div className="projects-grid">
              <figure className="project project--portrait" data-reveal>
                <img src="/images/expert-review.jpg" alt="Специалист проверяет строительные чертежи" width="1194" height="1536" loading="lazy" />
                <figcaption>
                  <span>01 / Коммерческие объекты</span>
                  <h3>Расчёт и контроль бюджета до приёмки работ</h3>
                </figcaption>
              </figure>
              <figure className="project project--detail" data-reveal>
                <img src="/images/estimate-detail.jpg" alt="Проверка сметы по рабочим чертежам" width="1194" height="1536" loading="lazy" />
                <figcaption>
                  <span>02 / Подрядчики</span>
                  <h3>Тендерные сметы и сверка объёмов</h3>
                </figcaption>
              </figure>
            </div>
            <div className="audience-list" data-reveal>
              {audiences.map(([title, text], index) => (
                <article className="audience-row" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ArrowUpRight size={22} weight="light" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-lead" data-reveal>
              <p className="section-label">О специалисте</p>
              <h2 id="about-title">Ольга<br />Потолицына</h2>
            </div>
            <div className="about-copy" data-reveal>
              <p className="about-intro">Инженер-сметчик с 16-летним опытом в строительстве, коммерческой недвижимости и государственных проектах.</p>
              <p>Не просто считаю стоимость. Проверяю логику проекта, вижу риски в документах и объясняю цифры так, чтобы их можно было уверенно защищать перед заказчиком, экспертизой или судом.</p>
              <ul>
                <li><Check size={18} /> работа по требованиям заказчика</li>
                <li><Check size={18} /> Гранд-Смета</li>
                <li><Check size={18} /> сметы, КС-2, КС-3, договоры и ЭДО</li>
              </ul>
              <a className="text-link" href="#contact">Обсудить проект <ArrowUpRight size={18} /></a>
            </div>
          </div>
        </section>

        <section className="section process" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="process-heading" data-reveal>
              <p className="section-label">Как строится работа</p>
              <h2 id="process-title">От исходных данных<br />до защищённого результата</h2>
            </div>
            <div className="process-list" data-reveal>
              {process.map(([title, text], index) => (
                <article className="process-row" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section pricing" id="price" aria-labelledby="price-title">
          <div className="container pricing-grid">
            <div className="pricing-copy" data-reveal>
              <p className="section-label">Стоимость</p>
              <h2 id="price-title">Сначала оцениваю задачу. Потом называю точную цену.</h2>
              <p>Пришлите документы или кратко опишите проект. Я посмотрю объём и предложу формат работы.</p>
            </div>
            <div className="price-list" data-reveal>
              {priceRows.map(([label, value]) => (
                <div className="price-row" key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
              <a className="button button--dark" href="#contact">Получить оценку <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="section-label">Начать работу</p>
              <h2 id="contact-title">Расскажите, какую смету нужно посчитать или проверить</h2>
              <p>Отвечу, какие документы понадобятся, сколько займёт работа и каким будет результат.</p>
              <div className="contact-links">
                <a href={`tel:+${phoneDigits}`}><Phone size={20} weight="fill" />{phoneDisplay}</a>
                <a href={`mailto:${email}`}><EnvelopeSimple size={20} weight="fill" />{email}</a>
                <a href={maxUrl} target="_blank" rel="noreferrer"><span className="social-icon max-social-icon" aria-hidden="true" />MAX</a>
                <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noreferrer"><TelegramLogo className="social-icon" size={20} weight="fill" aria-hidden="true" />@{telegramHandle}</a>
                <span><MapPin size={20} weight="fill" />Россия / работаю удалённо</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} data-reveal>
              <label>
                <span>Ваше имя</span>
                <input name="name" value={form.name} onChange={handleFormChange} placeholder="Как к вам обращаться" required />
              </label>
              <label>
                <span>Телефон или мессенджер</span>
                <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="+7 999 000-00-00 / @username" required />
              </label>
              <label>
                <span>Задача</span>
                <textarea name="message" value={form.message} onChange={handleFormChange} placeholder="Что нужно посчитать или проверить" rows="4" />
              </label>
              <div className="form-actions">
                <button className="button button--dark form-submit" type="submit" name="channel" value="telegram">
                  <TelegramLogo className="button-social-icon" size={18} weight="fill" aria-hidden="true" />
                  {formState === "telegram" ? "Telegram открыт" : "Отправить в Telegram"}
                  <ArrowUpRight size={18} />
                </button>
                <button className="button button--dark form-submit" type="submit" name="channel" value="max">
                  <img className="button-social-icon button-max-icon" src="/icons/max-official.svg" alt="" width="18" height="18" />
                  {formState === "max" ? "MAX открыт" : "Отправить в MAX"}
                  <ArrowUpRight size={18} />
                </button>
              </div>
              <small>Нажимая кнопку, вы соглашаетесь на обработку данных.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <span>Ольга Потолицына</span>
          <span>Инженер-сметчик / 2026</span>
          <a href="#top">Наверх <ArrowUpRight size={16} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
