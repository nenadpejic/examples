import PageLayout from '@/components/layouts/PageLayout'
import styles from './Profile.module.css'

type Props = {}

const Profile = ({}: Props) => {
  return (
    <PageLayout>
      <main className={styles.main}>
        <h1>Profile Page</h1>

        <section>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" />
            </div>

            <div className={styles.field}>
              <label htmlFor="old-password">Old Password</label>
              <input type="password" id="old-password" />
            </div>

            <div className={styles.actions}>
              <button>Change Password</button>
            </div>
          </form>
        </section>
      </main>
    </PageLayout>
  )
}

export default Profile
