import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/static/images/main_dduzi.svg"
          alt="뜨지 로고"
          width={140}
          height={143}
          priority
        />
        <h1 className={styles.title}>뜨지</h1>
        <p className={styles.tagline}>나만의 뜨개 기록장</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>뜨지가 뭐예요?</h2>
        <p className={styles.body}>
          뜨지는 내가 만든 뜨개 프로젝트를 기록하고, 진행 과정을 뜨개
          로그로 남기고, 완성한 작품을 다른 사람들과 공유할 수 있는
          앱이에요. 다른 사람들이 무엇을 뜨고 있는지 구경하고, 마음에 드는
          프로젝트는 내 뜨개함에 저장해둘 수도 있어요.
        </p>
        <ul className={styles.features}>
          <li>내 프로젝트와 뜨개 로그 기록하기</li>
          <li>완성작을 게시물로 공유하기</li>
          <li>다른 사람들의 뜨개 이야기 구경하기</li>
          <li>마음에 드는 프로젝트 뜨개함에 저장하기</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>뜨지 고객 지원</h2>
        <h3 className={styles.subTitle}>문의하기</h3>
        <p className={styles.body}>
          궁금한 점이나 불편한 사항이 있으시면 아래 이메일로 문의해
          주세요.
        </p>
        <p className={styles.email}>
          📧{" "}
          <a href="mailto:hyeminjo0102@gmail.com">
            hyeminjo0102@gmail.com
          </a>
        </p>
        <p className={styles.body}>답변은 영업일 기준 1~3일 이내에 드립니다.</p>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} 뜨지</p>
      </footer>
    </main>
  );
}
