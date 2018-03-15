import Head from 'next/head'

import paperSize from '../utils/paperSize'
import resume from 'json-loader!yaml-loader!../resume.yaml'


const { contact, experience, education, technical, project } = resume;


const Header = () => (
  <Head>
    <title>Narra</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    <link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500" rel="stylesheet" />
  </Head>
)



// https://github.com/gnab/remark/issues/83
const Page = ({ size = 'letter', children }) => {
  const [ width, height ] = paperSize.getSize(size, {
    unit: 'pixel',
    dpi: 100,
  })

  return (
    <div
      className="center bg-white"
      style={{ width, height }}
    >
      <style global jsx>{`
        body {
          font-family: 'Roboto', sans-serif;
          -webkit-print-color-adjust: exact;
        }

        .lh-note { line-height: 1.3; }

        .bg-crest-gray { background: #d8d8d8; }
        .bg-paper-white { background: #fbfbfb; }

        .crest-gray { color: #d8d8d8; }
        .light-moon-gray { color: #BBBBBB; }
        .muted-blue { color: #9aaebd; }

        .f6-half { font-size: 13px; }
        .f7-half { font-size: 11px; }
        .f8 { font-size: 10px; }
      `}</style>

      {children}
    </div>
  )
}


const Content = ({ children }) => (
  <div className="h-100 ph5 pv4 black-70 f6 relative">
    {children}
  </div>
)


const Contact = ({ contact: c }) => (
  <div className="f7 moon-gray flex items-end justify-end">
    <style jsx>{`
      & > div:not(:last-child) {
        margin-right: 8px;
      }
    `}</style>

    <div>{c.phone}</div>
    <div>/</div>
    <div>{c.email}</div>
    <div>/</div>
    <div>{c.website}</div>
    <div>/</div>
    <div>{c.location}</div>
  </div>
)


const Headline = ({ contact: c }) => {
  return (
    <div className="">
      <div className="f3 fw6">{c.name}</div>

      <div className="mt1 f6-half fw3 moon-gray">
        {c.byword}
      </div>
    </div>
  )
}


const Crest = ({ children }) => (
  <div
    className="bg-crest-gray b ttu f8 fw5 white inline-flex tracked"
    style={{ padding: '2.5px 4px 2px' }}
  >
    {children}
  </div>
)

const Section = ({ name, className, children }) => (
  <div className={className}>
    {name && (
      <div className="mb1">
        <Crest>{name}</Crest>
      </div>
    )}

    <div className="mb4">
      {children}
    </div>
  </div>
);


const Tag = ({ children }) => (
  <span
    className="f8 br1 bg-paper-white light-silver"
    style={{ padding: '1px 2px' }}
  >
    {children}
  </span>
)

const Entry = ({ decorator, name, role, notes = [], marker = "-" }) => {
  return (
    <div className="mb2 pt2">
      <style jsx>{`
        ul {
          list-style: none;
          padding-left: 0;
        }
        ul li:before {
          content: "${marker}";
          position: absolute;
          margin-left: -12px;
        }
      `}</style>

      <div className="mb2">
        <div className="f7-half i moon-gray mb1">
          {decorator}
        </div>
        <div className="f6">
          <span className="fw6">{name}</span>
          {role && (
            <span className="ml2 muted-blue f7">/ {role}</span>
          )}
        </div>
      </div>

      <div className="gray f7 lh-note">
        <ul className="mv0">
          {notes.map((n, idx) => (
            <li key={`${name}-note-${idx}`} className="mv1">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}



export default () => (
  <div className="bg-near-white">
    <Header />

    <Page>
      <Content>
        <Contact contact={contact} />
        <Headline contact={contact} />

        <div className="mt5 flex black-70">
          <div className="w-30 pr3 flex flex-column justify-between">
            <Section>
              <style jsx>{`
                div:first-child:before {
                  content: "▲";
                  font-weight: 600;
                  position: absolute;
                  margin-left: -18px;
                  color: #000000b3;
                }
              `}</style>

              {contact.notes.map((n, idx) => (
                <div
                  key={`contact-note-${idx}`}
                  className="f7 gray lh-copy mb3"
                >
                  {n}
                </div>
              ))}
            </Section>
            <div>
              <Section name="technical">
                {technical.map(t => (
                  <div
                    key={t.name}
                    className="mt3"
                  >
                    <style jsx>{`
                      ul {
                        list-style: none;
                        padding-left: 0;
                      }
                      ul li:before {
                        content: "";
                        position: absolute;
                        margin-left: -12px;
                      }
                    `}</style>

                    <div className="f7 fw6 mb2">
                      {t.name}
                    </div>
                    <ul className="gray f7 lh-note mv0">
                      {t.notes.map((n, idx) =>
                        <li
                          key={`technical-note-${idx}`}
                          className="mv1"
                        >
                          {n}
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </Section>

              <Section name="project">
                {project.map(p =>
                  <Entry
                    key={p.name}
                    decorator={p.website}
                    name={p.name}
                    notes={p.notes}
                  />
                )}
              </Section>
            </div>
          </div>

          <div className="w-70 pl3">
            <Section name="Experience">
              {experience.map(e =>
                <Entry
                  key={e.name}
                  decorator={`${e.start} — ${e.end}`}
                  name={e.name}
                  role={e.role}
                  notes={e.notes}
                />
              )}
            </Section>

            <Section name="Education">
              {education.map(e =>
                <Entry
                  key={e.name}
                  decorator={`${e.start} — ${e.end}`}
                  name={e.name}
                  role={e.role}
                  notes={e.notes}
                />
              )}
            </Section>
          </div>
        </div>
      </Content>
    </Page>
  </div>
)
