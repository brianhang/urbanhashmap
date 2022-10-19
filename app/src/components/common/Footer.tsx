import styles from './Footer.module.css';

type Props = React.PropsWithChildren<{}>;

export default function Footer(_props: Props) {
    return (
        <div className={styles.footer}>
            <ul>
                <li><a href="/privacy.html">Privacy Policy</a></li>
            </ul>
        </div>
    );
}

