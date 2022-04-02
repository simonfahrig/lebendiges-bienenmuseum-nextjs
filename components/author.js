import Image from 'next/image'
import styles from './author.module.css'

export default function Author({ authorString }) {
    return (
        <div>
            <hr style={{ margin: "150px 0 0" }} />
            <h3>Erstellt von:</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
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
                    <div className={styles.authorName}>{authorString}</div>
                    <div>citation this is why the earth is turning round</div>
                </div>
            </div>
        </div >
    )
}
