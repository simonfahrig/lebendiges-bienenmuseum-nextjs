import Image from 'next/image'
import styles from './author.module.css'

export default function Author({ authorString }) {
    return (
        <div>
            <h3>Erstellt von:</h3>
            <div>
                <Image className={styles.profileImage}
                    priority
                    src={"/images/authors/" + authorString + ".jpg"}
                    height={64}
                    width={64}
                    alt={authorString}
                />
            </div>
            <p>{authorString}</p>
        </div>
    )
}
