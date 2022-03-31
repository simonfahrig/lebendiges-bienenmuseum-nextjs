import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/news'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Aktuelle Informationen</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/news/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <section>
        <p>Wir leben auf dem spannendsten Planeten, der derzeit in unserem Universum bekannt ist. Wir teilen ihn mit vielen anderen Lebewesen, die sich an die verschiedensten Lebensräume angepasst haben. Doch ehrlich: wie viele unserer Mit-Lebewesen kennen Sie wirklich?</p>
        <p>Im Garten und auf dem Freigelände des Bienenmuseums sind wir bemüht, wenigstens eine Bestandserfassung der dort wild lebenden Tiere, Pflanzen und Pilze durchzuführen. Die hier nachgewiesenen und bisher bestimmten Pflanzengruppen und Flechten werden auf den folgenden Seiten kurz vorgestellt und die Artenlisten laufend aktualisiert.</p>
        <p>Die Belegexemplare befinden sich im Archiv des Lebendigen Bienenmuseums, wo sie interessierten Experten nach Absprache zur Bearbeitung zur Verfügung stehen. Dabei ist jeder Spezialist einer noch nicht oder nicht vollständig bearbeiteten Gruppe herzlich eingeladen, hier Untersuchungen durchzuführen oder das vorhandene Material weiter zu bearbeiten.</p>
        <p>
          <Image 
            src="/images/fruehjbl.jpg"
            width="269" 
            height="356"
          />
        </p>
        <p>Bei der Bestimmung der Gräser halfen mir Franz Rebele, Berlin, und Wolfgang Lehmann, Korbach. Die Flechten wurden mit Patrick Dornes, Pforzheim, erfasst und von diesem auch bestimmt. Die Moose konnten mit Hilfe von Jürgen Klawitter, Berlin, erfasst werden und wurden von diesem auch bestimmt. Für die Algen haben wir noch keinen Bearbeiter gefunden. Auch bei den Blütenpflanzen sind längst nicht alle Arten erfasst, die im Garten und am Bahndamm im Bereich des Lebendigen Bienenmuseums wild vorkommen oder angepflanzt sind. Insbesondere die Gartenstauden mit all ihren verschiedenen Sorten und die Nutzpflanzen bedürfen noch einer genaueren Erfassung. Hier ist allerdings noch vieles im Fluss, da die Feingestaltung des Gartens gerade erst begonnen hat. Bei der Ausstattung des Gartens mit neuen Stauden kommt uns große Hilfe von den nordhessischen Staudenfreunden zu, die sich derzeit in drei Freundschaftsgruppen treffen.</p>
        <p>Für ihre Mithilfe sei allen hiermit nochmals herzlich gedankt.</p>
      </section> */}
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
