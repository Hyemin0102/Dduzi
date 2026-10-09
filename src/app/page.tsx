import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/static/images/1_onboarding.png"
          alt="뜨지 온보딩 화면"
          width={300}
          height={270}
          style={{ width: "100%", maxWidth: 300, height: "auto" }}
          priority
        />
        <h1 className={styles.title}>뜨지</h1>
        <p className={styles.tagline}>조용한 뜨개 SNS</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>뜨지는 어떤 서비스인가요?</h2>
        <p className={styles.body}>
          뜨지는 내가 만든 뜨개 프로젝트를 기록하고, 완성한 작품을 다른
          사람들과 조용히 나눌 수 있는 뜨개 SNS예요.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>나의 뜨개 기록장</h2>
        <p className={styles.body}>
          프로젝트를 만들고, 진행 과정을 뜨개 로그로 남겨보세요. 예정 ·
          진행 중 · 완료 상태로 나눠 관리할 수 있어서, 지금 뭘 뜨고
          있는지 한눈에 볼 수 있어요.
        </p>
        <ul className={styles.features}>
          <li>내 프로젝트와 뜨개 로그 기록하기</li>
          <li>프로젝트를 예정 · 진행 중 · 완료로 나눠서 관리하기</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>함께 나누는 뜨개 이야기</h2>
        <p className={styles.body}>
          완성작을 게시물로 공유하고, 다른 사람들이 무엇을 뜨고 있는지
          구경해보세요. 마음에 드는 작품엔 좋아요와 댓글로 응원을 남길 수
          있고, 관심있는 프로젝트는 내 뜨개함에 보관해 계속 볼 수 있어요.
          또 도안 탐색에서 새로운 패턴을 찾아 위시뜨개로 저장해둘 수도
          있어요.
        </p>
        <ul className={styles.features}>
          <li>완성작을 게시물로 공유하기</li>
          <li>좋아요와 댓글로 응원 남기기</li>
          <li>다른 사람들의 뜨개 이야기 구경하기</li>
          <li>도안 탐색에서 패턴 찾아보고 위시뜨개 저장하기</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>놓치지 않게 알려드려요</h2>
        <p className={styles.body}>
          뜨개함에 저장해둔 프로젝트에 새 소식이 올라오면 알림으로
          알려드려요.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>뜨지 응원하기</h2>
        <p className={styles.body}>
          뜨지가 마음에 드셨다면, 마이페이지에서 작은 응원을 보내주실 수
          있어요. 1인 개발자가 운영하는 앱이라, 응원 한 번이 앱과 서버를
          계속 운영하는 데 큰 힘이 됩니다.
        </p>
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
        <p>©2026 Ddohaemin</p>
        <p>사업자명: 또해민 (Ddohaemin) · 대표: 조혜민</p>
      </footer>
    </main>
  );
}
