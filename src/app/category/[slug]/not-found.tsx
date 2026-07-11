import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "100px 0", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>카테고리를 찾을 수 없습니다</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        요청하신 카테고리가 존재하지 않습니다.
      </p>
      <Link href="/" className="btn btn--blue" style={{ display: "inline-flex" }}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
