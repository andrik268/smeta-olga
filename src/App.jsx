import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Buildings,
  Calculator,
  Check,
  FileArrowUp,
  FileText,
  List,
  MapPin,
  PaperPlaneTilt,
  Phone,
  ShieldCheck,
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

const audiences = [
  {
    title: "Девелоперы и управляющие компании",
    text: "Торговые центры, бизнес-центры и склады. Контроль бюджета от расчёта до приёмки.",
  },
  {
    title: "Подрядчики и субподрядчики",
    text: "Тендерные сметы, сверка объёмов, расценок и требований конкретного заказчика.",
  },
  {
    title: "Компании, работающие по 44-ФЗ",
    text: "Документы для школ, больниц и социальных объектов, готовые к экспертизе и проверке.",
  },
];

const services = [
  {
    className: "service-panel--main",
    icon: Calculator,
    label: "Основная услуга",
    title: "Смета под ключ",
    text: "Локальные сметы, дефектные ведомости и коммерческие предложения в Гранд-Смете и Турбо-Сметчике.",
    result: "Документ, который можно сразу отправлять заказчику.",
  },
  {
    className: "service-panel--audit",
    icon: ShieldCheck,
    label: "Проверка",
    title: "Аудит готовой сметы",
    text: "Нахожу ошибки в объёмах, коэффициентах и нормативах до оплаты работ.",
    result: "От 10 000 ₽",
  },
  {
    className: "service-panel--support",
    icon: FileText,
    label: "Сопровождение",
    title: "КС-2, КС-3, договоры и ЭДО",
    text: "Контролирую документы и работу подрядчиков на всех этапах проекта.",
    result: "Стоимость по задаче",
  },
  {
    className: "service-panel--expert",
    icon: Buildings,
    label: "Экспертиза",
    title: "Подготовка расчётов для суда",
    text: "Собираю обоснованную позицию для арбитража и судебной экспертизы.",
    result: "Договорная стоимость",
  },
];

const process = [
  ["Получаю исходные данные", "Вы присылаете смету, ТЗ или коротко описываете задачу."],
  ["Проверяю риски", "Сверяю объёмы, нормативы, коэффициенты и требования заказчика."],
  ["Собираю решение", "Фиксирую правки и выпускаю понятный документ для согласования."],
  ["Сопровождаю результат", "Отвечаю на вопросы по приёмке, договорам и изменениям проекта."],
];

const priceRows = [
  ["Проверка готовой сметы", "от 10 000 ₽"],
  ["Смета под ключ", "от 40 000 ₽"],
  ["Судебная экспертиза", "по запросу"],
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Ольга Потолицына, на главную">
      <span className="logo-mark">ОП</span>
      <span className="logo-copy">
        <strong>Ольга Потолицына</strong>
        <small>сметное сопровождение</small>
      </span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    const items = [...document.querySelectorAll("[data-reveal]")];
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

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top > window.innerHeight) item.classList.add("reveal-armed");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
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

    window.open(
      `https://t.me/${telegramHandle}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setFormState("sent");
  };

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Основная навигация">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-phone" href={`tel:+${phoneDigits}`}>{phoneDisplay}</a>
            <a className="button button--compact" href="#contact">Проверить смету</a>
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={23} /> : <List size={23} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">Инженер-сметчик / 16 лет практики</p>
              <h1 id="hero-title"><span>Смета выдержит</span>{" "}<span>проверку.</span></h1>
              <p className="hero-lede">Проверяю цифры, защищаю бюджет и готовлю документы для заказчика, тендера или суда.</p>
              <div className="hero-actions">
                <a className="button" href="#contact">Проверить смету <ArrowRight size={19} weight="bold" /></a>
                <a className="text-link" href="#services">Что можно поручить <ArrowUpRight size={17} weight="bold" /></a>
              </div>
            </div>
            <figure className="hero-media">
              <img
                src="/images/hero-technical-v2.jpg"
                alt="Проверка строительной сметы и проектной документации"
                width="1600"
                height="933"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="proof" aria-label="Опыт и результаты">
          <div className="container proof-grid">
            <div className="proof-intro">
              <p>Опыт с федеральными сетями и государственными заказчиками</p>
              <strong>Магнит, Пятерочка, Чижик</strong>
            </div>
            <div className="proof-stat proof-stat--large"><strong>2,5 млрд ₽</strong><span>общая стоимость проектов</span></div>
            <div className="proof-stat"><strong>10-15%</strong><span>экономии после аудита</span></div>
            <div className="proof-stat"><strong>1-2 дня</strong><span>на согласование сметы</span></div>
          </div>
        </section>

        <section className="section audience" id="audience" aria-labelledby="audience-title">
          <div className="container audience-layout">
            <div className="section-intro" data-reveal>
              <h2 id="audience-title">Когда ошибка в смете стоит дорого</h2>
              <p>Учитываю не только объект, но и правила конкретного заказчика, этап проекта и способ будущей проверки.</p>
            </div>
            <div className="audience-list" data-reveal>
              {audiences.map((item) => (
                <article className="audience-item" key={item.title}>
                  <ArrowUpRight size={22} weight="bold" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-intro section-intro--services" data-reveal>
              <h2 id="services-title">Считаю. Проверяю. Защищаю.</h2>
              <p>Подключаюсь на нужном этапе и довожу задачу до документа, который удобно согласовывать.</p>
            </div>
            <div className="services-grid" data-reveal>
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className={`service-panel ${service.className}`} key={service.title}>
                    <div className="service-topline">
                      <span>{service.label}</span>
                      <Icon size={25} weight="regular" />
                    </div>
                    <div className="service-body">
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                    <div className="service-result"><Check size={17} weight="bold" /><span>{service.result}</span></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section expertise" id="about" aria-labelledby="about-title">
          <div className="container expertise-grid">
            <figure className="expertise-media" data-reveal>
              <img src="/images/blueprint-detail.png" alt="Чертёж и исходные данные для сметного расчёта" width="1536" height="1024" loading="lazy" />
            </figure>
            <div className="expertise-copy" data-reveal>
              <h2 id="about-title">За результат отвечаю лично</h2>
              <p className="expertise-lede">Ольга Потолицына, инженер-сметчик с 16-летним стажем. Коммерческие объекты, социальная инфраструктура и госзаказ.</p>
              <div className="expertise-facts">
                <p><span>Образование</span><strong>Инженер ПГС</strong></p>
                <p><span>Практика</span><strong>Гранд-Смета, Турбо-Сметчик, 44-ФЗ</strong></p>
                <p><span>Опыт</span><strong>Судебные экспертизы и проверки заказчиков</strong></p>
              </div>
              <p className="expertise-note">Участвовала в строительстве Академического театра драмы им. В. Савина и Республиканского лыжного комплекса им. Р. Сметаниной.</p>
              <a className="text-link" href={`mailto:${email}`}>Задать вопрос <ArrowUpRight size={17} weight="bold" /></a>
            </div>
          </div>
        </section>

        <section className="section process" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="section-intro" data-reveal>
              <h2 id="process-title">Понятный процесс без лишних согласований</h2>
              <p>Первый шаг простой: пришлите готовую смету, ТЗ или коротко опишите ситуацию.</p>
            </div>
            <div className="process-track" data-reveal>
              {process.map(([title, text]) => (
                <article className="process-item" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section price" id="price" aria-labelledby="price-title">
          <div className="container price-layout">
            <div className="price-copy" data-reveal>
              <h2 id="price-title">Цена известна до начала работы</h2>
              <p>Оцениваю объём, количество разделов и срок. После этого фиксирую стоимость без скрытых доплат.</p>
              <a className="button button--secondary" href="#contact">Получить оценку <ArrowRight size={19} weight="bold" /></a>
            </div>
            <div className="price-list" data-reveal>
              {priceRows.map(([label, value]) => (
                <div className="price-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <p>Экспресс-оценка сметы бесплатна.</p>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <h2 id="contact-title">Пришлите смету. Я скажу, что проверить в первую очередь.</h2>
              <p>Отвечу по задаче, назову срок и стоимость. Можно сразу написать в Telegram или позвонить.</p>
              <div className="contact-links">
                <a href={`tel:+${phoneDigits}`}><Phone size={20} weight="bold" /><span>{phoneDisplay}</span></a>
                <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noreferrer"><PaperPlaneTilt size={20} weight="bold" /><span>@{telegramHandle}</span></a>
                <a href={`mailto:${email}`}><FileText size={20} weight="bold" /><span>{email}</span></a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} data-reveal>
              <div className="form-heading">
                <h3>Экспресс-оценка</h3>
                <FileArrowUp size={25} />
              </div>
              <label>
                <span>Имя</span>
                <input name="name" value={form.name} onChange={handleFormChange} placeholder="Как к вам обращаться" autoComplete="name" required />
              </label>
              <label>
                <span>Телефон</span>
                <input name="phone" type="tel" value={form.phone} onChange={handleFormChange} placeholder="+7 900 000 00 00" autoComplete="tel" required />
              </label>
              <label>
                <span>Что нужно проверить?</span>
                <textarea name="message" value={form.message} onChange={handleFormChange} placeholder="Коротко опишите проект или прикрепите файл в Telegram" rows="4" required />
              </label>
              <button className="button form-submit" type="submit">Отправить в Telegram <PaperPlaneTilt size={19} weight="bold" /></button>
              <p className="form-hint">Telegram откроется с уже подготовленным сообщением.</p>
              {formState === "sent" && <p className="form-success" role="status">Сообщение подготовлено. Если Telegram не открылся, напишите напрямую: @{telegramHandle}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <Logo />
          <p>Сметное сопровождение коммерческих и государственных строительных проектов по всей России.</p>
          <div className="footer-contact">
            <a href={`tel:+${phoneDigits}`}>{phoneDisplay}</a>
            <span><MapPin size={16} /> Краснодар</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Ольга Потолицына</span>
          <span>Инженер-сметчик</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
