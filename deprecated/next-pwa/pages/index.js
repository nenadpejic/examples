import styles from '../styles/Home.module.css'
import HeadComponent from '../components/HeadComponent'

export default function Home() {
  return (
    <div className={styles.container}>
      <HeadComponent
        title='Example Title'
        description='Example Description'
        url='https://www.example.com'
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  )
}
