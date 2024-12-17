import Link from 'next/link'
import styles from './Header.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'

type Props = {}

const Header = ({}: Props) => {
  const session = useSession()
  console.log(session)

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>

      <nav>
        <ul className={styles.navigationList}>
          <li>
            <Link href="/profile" className={styles.button}>
              Profile
            </Link>
          </li>
          {session.status === 'unauthenticated' ? (
            <li>
              <Link href="api/auth/signin" className={styles.button}>
                Sign in
              </Link>
              {/* <button className={styles.button} onClick={() => signIn()}>Sign in</button> */}
            </li>
          ) : (
            <>
              <li>
                <Link href="api/auth/signout" className={styles.button}>
                  Sign out
                </Link>
                {/* <button className={styles.button}>Sign out</button> */}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
