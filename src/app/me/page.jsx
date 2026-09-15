import Link from "next/link";
import Preloader from "./Preloader";
import Switch from "./Switch";
import "./me.css";

export const metadata = {
  title: "Yash Srivastava — Everything, in one page",
  description:
    "Education, experience, projects and skills. The whole picture, short and readable.",
  /**
   * The page answers at two addresses — me.yashsrivasta7a.in and
   * yashsrivasta7a.in/me — so one of them has to be named as the real one, or
   * search engines pick arbitrarily and split the ranking between them. The
   * subdomain wins because that is the address worth sharing.
   */
  alternates: {
    canonical: "https://me.yashsrivasta7a.in",
  },
  openGraph: {
    type: "profile",
    url: "https://me.yashsrivasta7a.in",
    title: "Yash Srivastava — Everything, in one page",
    description:
      "Education, experience, projects and skills. The whole picture, short and readable.",
  },
};

const LINKS = [
  { label: "Email", href: "mailto:yashsrivasta7a@gmail.com", text: "yashsrivasta7a@gmail.com" },
  { label: "GitHub", href: "https://github.com/yashsrivasta7a", text: "yashsrivasta7a" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yashsrivasta7a", text: "yashsrivasta7a" },
  { label: "LeetCode", href: "https://leetcode.com/u/yashsrivasta7a", text: "yashsrivasta7a" },
];

const EXPERIENCE = [
  {
    company: "RazorNext",
    role: "Frontend Engineer Intern",
    when: "Jul 2026 — Present",
    where: "Gurugram",
    bullets: [
      "Shipping client work that real people use — Flipkart Foundation, Boston Scientific, Himalaya's China site, and a few internal retail platforms.",
      "Wired Strapi into server-rendered routes so the content team can publish without waiting on a deploy, with SEO and analytics handled properly rather than bolted on.",
    ],
    link: "https://razornext.com/",
  },
  {
    company: "SciTech Industries",
    role: "SDE Intern",
    when: "Mar 2026 — Jun 2026",
    where: "Remote",
    bullets: [
      "Built the platform that watches 50+ machines on a factory floor and reports back to the cloud.",
      "Factory networks drop constantly, so each device holds its last 5,000 readings locally and replays them once it reconnects. Nothing gets lost while the link is down.",
      "Set up the Raspberry Pis to provision and update themselves over the air, so nobody has to walk the floor with a laptop to push a change.",
    ],
    link: "https://scitechindustries.com/",
  },
  {
    company: "Galaxy.ai",
    role: "SDE Intern",
    when: "Jan 2026 — Feb 2026",
    where: "Remote",
    bullets: [
      "Worked on the canvas where people wire AI models, tools and APIs together without writing code.",
      "Built the node primitives everything else is assembled from — triggers, inputs, actions — so new workflow types didn't need new components each time.",
    ],
    link: "https://galaxy.ai",
  },
  {
    company: "Adquora",
    role: "Frontend Intern",
    when: "Sep 2025 — Dec 2025",
    where: "Remote",
    bullets: [
      "Designed and built the company's site end to end, as part of the core tech team.",
    ],
    link: "https://adquora.vercel.app",
  },
  {
    company: "KPMG India",
    role: "Academic Trainee",
    when: "Jun 2025 — Aug 2025",
    where: "Noida",
    bullets: [
      "Built an agent that lets people ask questions of company data in plain English instead of waiting on someone to write the query.",
      "The hard part was the retrieval — getting it to come back with a straight, structured answer that someone non-technical could actually act on.",
    ],
  },
  {
    company: "FISU, MRIIRS",
    role: "React Developer",
    when: "Jun 2024 — Sep 2024",
    where: "Faridabad",
    bullets: [
      "My first real project: an app for a university sports event, showing live schedules and helping people find their way between venues.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Cascade",
    line: "You drag nodes onto a canvas and it figures out the rest — which steps can run at the same time, which have to wait, and what it already computed last time so it doesn't pay for the same API call twice. There's an MCP server too, so Claude can build and run these workflows just by being asked.",
    tags: ["Trigger.dev", "OpenRouter", "MCP"],
    live: "https://cascade-ys7.vercel.app",
    code: "https://github.com/yashsrivasta7a/Cascade",
  },
  {
    name: "InterviewD",
    line: "Mock interviews that watch you back. It asks the questions and scores the answers, but it also reads the webcam every fifteen seconds — whether you look engaged, whether you're slouching, whether you seem sure of yourself. Then it hands you a report.",
    tags: ["Azure OpenAI", "Gemini", "Auth0"],
    live: "https://interviewd.vercel.app/",
    code: "https://github.com/yashsrivasta7a/interviewD",
  },
  {
    name: "AuroraPlay",
    line: "Playlists that check the forecast first. It reads the weather where you are and builds a Spotify queue to match it, so grey afternoons and clear mornings don't get the same music.",
    tags: ["Spotify API", "Next.js"],
    live: "https://auroraplayai.vercel.app/",
    code: "https://github.com/yashsrivasta7a/AuroraPlay",
  },
  {
    name: "Essential Space",
    line: "Somewhere to put the notes and links you'd otherwise lose. Search understands what you meant rather than just matching words, anything long gets summarised in a click, and you decide what stays private.",
    tags: ["Next.js", "AI search"],
    live: "https://essentialspaceai.vercel.app/",
    code: "https://github.com/yashsrivasta7a/Essential-Space",
  },
  {
    name: "Flow4Life",
    line: "Built for the hours that matter when someone needs blood. Post a request, see who's nearby and eligible, message them directly, and everyone involved gets told the moment something changes.",
    tags: ["Real-time", "Geolocation"],
    live: "https://flow4life.vercel.app/",
    code: "https://github.com/yashsrivasta7a/Flow4Life",
  },
  {
    name: "DreamPix",
    line: "Type a sentence, get a picture. Everything you make lands in a gallery that's yours, behind an account, in an interface that mostly gets out of the way.",
    tags: ["Generative AI", "Next.js"],
    live: "https://dreampix.vercel.app/",
    code: "https://github.com/yashsrivasta7a/DreamPix",
  },
  {
    name: "Showfolio",
    line: "Upload a CV, get a portfolio site. It reads the résumé you already have and turns it into something you can send a link to, without anyone opening a template editor.",
    tags: ["Next.js", "Parsing"],
    live: "https://showfolio.app/",
  },
  {
    name: "AdQuora",
    line: "The company's own site, built to do one job properly: explain what they offer and show the results, without the usual agency filler.",
    tags: ["React", "Firebase"],
    live: "https://adquora.vercel.app/",
    code: "https://github.com/yashsrivasta7a/Adquora",
  },
];

const SKILLS = [
  ["Languages", "TypeScript, JavaScript, C++"],
  ["Frontend", "React, Next.js, Tailwind, Framer Motion"],
  ["Backend", "Node.js, NestJS, Express, LangChain, LangGraph"],
  ["Data", "PostgreSQL, MongoDB, Firebase"],
  ["Cloud", "AWS IoT Core, Greengrass V2, Lambda, Kinesis, Docker"],
];

/** An achievement that has a certificate behind it. */
function Cert({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const CERT = {
  hackItUp: "https://drive.google.com/file/d/1CfPuv0vRJnND9VaEXLxD0-AuOhzsXeK3/view",
  placement: "https://drive.google.com/file/d/1B9iPB2LQqfDBTJsOnGBadsmNaJ8SND09/view",
  designBlitz: "https://drive.google.com/file/d/1DYyxlMxTytPXUTV-92-9u-vKgwVs6YiG/view",
  hackedAThon: "https://drive.google.com/file/d/1CBhThPy9ctJhdbq1AJdvJpAC4Kfm9W7p/view",
  innoverse: "https://drive.google.com/file/d/1wISYOtPvuCBVcNiKnVeMzWNwd1e7bdq4/view",
};

export default function MePage() {
  return (
    <main className="me">
      <Preloader />

      {/*
        Behind everything, off by default.

        `preload="none"` so the 2.2MB never loads for anyone who leaves the
        switch alone — which is everyone on first visit. The Glow switch is
        what fetches it. Muted and playsInline are both required for autoplay
        to be allowed at all.
      */}
      <video
        className="me-glow"
        src="/loopbg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden
      />

      <div className="me-switches">
        <Switch label="Glow" attr="glow" storageKey="me_glow" defaultOn={false} />
        <Switch label="Highlight" attr="highlight" storageKey="me_highlight" />
      </div>

      <header className="me-head">
        <h1>
          Yash <em>Srivastava.</em>
        </h1>
        {/* One line, not a paragraph. Whoever lands here wants to know what you
            do and where — everything below says the rest better than prose. */}
        <p className="me-standfirst">
          I build the whole thing: the screen, the server, and the awkward bits
          in between.
        </p>
        <ul className="me-links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <span>{l.label}</span>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {l.text}
              </a>
            </li>
          ))}

          {/* Education sits in the same row rather than owning a section. It is
              one fact, and a whole section for one fact reads as padding — the
              detail is there for anyone who wants it, on hover. */}
          <li className="me-edu">
            <span>Education</span>
            <button type="button" aria-describedby="me-edu-detail">
              Bachelor of Technology
            </button>
            <span className="me-edu-detail" id="me-edu-detail" role="tooltip">
              <b>Manav Rachna International Institute of Research and Studies</b>
              <i>Sep 2022 — Jun 2026</i>
            </span>
          </li>
        </ul>
      </header>

      {/* Collapsed by default — six roles is a lot of vertical noise for
          someone who came to look at the work. `<details>` does this with no
          JavaScript and stays keyboard- and screen-reader-navigable. */}
      <section>
        <details className="me-details">
          <summary>
            <h2 className="me-section-title">Experience</h2>
            <span className="me-summary-line">
              Six internships since 2024. Agencies, a startup, a factory
              automation company, and KPMG.
            </span>
          </summary>

          <ol className="me-jobs">
            {EXPERIENCE.map((job, i) => (
              <li key={job.company} style={{ "--i": i }}>
                <div className="me-row">
                  <h3>
                    {job.link ? (
                      <a href={job.link} target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    <span className="me-role">
                      {job.role} · {job.where}
                    </span>
                  </h3>
                  <span className="me-when">{job.when}</span>
                </div>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </details>
      </section>

      <section>
        <details className="me-details">
          <summary>
            <h2 className="me-section-title">Selected work</h2>
            <span className="me-summary-line">
              Eight projects. All of them live, most on GitHub.
            </span>
          </summary>

          <ol className="me-projects">
            {PROJECTS.map((p, i) => (
              <li key={p.name} style={{ "--i": i }}>
                <span className="me-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.line}</p>
                  <div className="me-meta">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                    <a href={p.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                    {p.code ? (
                      <a href={p.code} target="_blank" rel="noreferrer">
                        Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </details>
      </section>

      <section>
        <h2 className="me-section-title">Skills</h2>
        <dl className="me-skills">
          {SKILLS.map(([group, items]) => (
            <div key={group}>
              <dt>{group}</dt>
              <dd>{items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="me-section-title">Leadership &amp; awards</h2>
        {/* Written as three sentences rather than seven bullets. A list where
            every item gets its own line makes six small things look like six
            equal things, and the reading gets slower the more of them there
            are. The names still carry their certificates. */}
        <div className="me-awards">
          <p>
            I run <Cert href={CERT.placement}>placements</Cert> for my department
            and I&apos;m secretary of MRSDC, the developer community at my
            college — ten-odd events so far, usually 60 to 80 people in the room.
            One of them was <Cert href={CERT.hackItUp}>Hack It Up</Cert>, our
            intra-college hackathon, which I ran end to end.
          </p>
          <p>
            Won <b>Code Sangam&apos;24</b> against 60-plus teams and{" "}
            <Cert href={CERT.designBlitz}>Design Blitz</Cert>. Came third at{" "}
            <Cert href={CERT.hackedAThon}>Hacked-a-thon</Cert> out of 50-plus,
            and at <Cert href={CERT.innoverse}>Innoverse&apos;36</Cert>.
          </p>
        </div>
      </section>

      <footer className="me-foot">
        <span>Prefer the PDF?</span>
        <div>
          <a
            href="https://drive.google.com/file/d/1Gr7QfLpqAYDDzEi8_MA9j6K2Vr1zN3CT/view"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <Link href="/">Portfolio</Link>
        </div>
      </footer>
    </main>
  );
}
