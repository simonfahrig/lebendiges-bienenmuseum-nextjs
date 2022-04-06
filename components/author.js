import { fromUnixTime } from 'date-fns';
import Image from 'next/image'
import Link from 'next/link'
import styles from './author.module.css'

export default function Author({ authorString }) {
    let authorData = getAuthorData(authorString);
    return (
        <div>
            <hr style={{ margin: "150px 0 0" }} />
            <h3>Erstellt von:</h3>
                <Link href={"/authors/" + camelize(authorString)}>
                    <a className={styles.link}>
                        <div>
                            <Image className={styles.profileImage}
                                priority
                                src={"/images/authors/" + authorString + ".jpg"}
                                height={64}
                                width={64}
                                alt={authorString}
                            />
                            <div></div>
                        </div>
                        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
                            <div className={styles.authorName}>{authorData.displayName}</div>
                            <div className={styles.citation}>

                                “
                                <em>{authorData.citation}</em>
                                ”

                            </div>
                        </div>
                    </a>
                </Link>
        </div >
    )
}

const getAuthorData = (authorString) => {
    let authors =
        [
            {
                name: "Erika Geiseler",
                displayName: "Erika Geiseler",
                profession: "Imkermeisterin",
                citation: "Lebendiges Bienenmuseum"
            },
            {
                name: "Hans-Joachim Flügel",
                displayName: "Hans-Joachim Flügel †️",
                profession: "Diplom-Biologe",
                citation: "Wir leben auf dem spannendsten Planeten, der derzeit in unserem Universum bekannt ist."
            }
        ];
    for (let i = 0; i < authors.length; i++) {
        if (authorString == authors[i].name) {
            return authors[i];
        }
    }

    return {
        name: "unknown",
        displayName: "unknown",
        profession: "",
        citation: ""
    }
}

function camelize(str) {
    var _ = require('lodash');
    return _.camelCase(str);
    // return str.replace(/(?:^\w|[A-ZÀ-Ö]|\b\w)/g, function (word, index) {
    //     return index === 0 ? word.toLowerCase() : word.toUpperCase();
    // }).replace(/\s+/g, '');
}