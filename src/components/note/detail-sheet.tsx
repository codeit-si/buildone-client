"use client";

import Sheet from "@/components/@common/portal/sheet";
import Goal from "@/components/note/goal";
import Todo from "@/components/note/todo";

export default function DetailSheet(): JSX.Element {
  return (
    <Sheet.Content className="gap-0 p-24">
      <div className="mb-16" />
      <Goal goalText="자바스크립트로 웹 서비스 만들기" />
      <div className="flex items-center justify-between">
        <Todo todoText="자바스크립트 기초 챕터1 듣기" date="2024. 04. 29" />
      </div>
      <div className="h-52 border-b border-t border-slate-200 pb-12 pt-12 text-lg font-medium text-slate-800">
        프로그래밍과 데이터 in JavaScript
      </div>
      <div className="scrollbar mt-16 overflow-y-auto text-base font-normal text-slate-700">
        자바언어의 과거-현재-그리고 미래 자바는 어떤 배경에서 처음 만들어
        졌는지, 또한 시대의 흐름에 따라 어떻게 변화해 왔는지, 어떤 요구사항들로
        인해 새로운 기술들이 개발되었는지 살펴보는 것은 자바를 보다 잘
        이해하는데 도움이 됩니다. 다음은 시대별 중요 이벤트로 살펴본 자바의
        간략한 변천사 입니다. 자바의 탄생 1995년 썬 마이크로시스템즈의
        제임스고슬링에 의해 개발 되어 처음 공개. 가상머신 이라는 개념으로 플랫폼
        독립적인 구현이라는 당시로는 참신한 접근. 객체지향 개념과 개발 문화의
        확산에 기여. 인터넷과 웹의 발전과 함께 하게 됨. 서블릿과 JSP 1997년 공식
        발표 되었으며 자바에서 웹프로그램 개발을 지원. 인터넷의 폭팔적인 성장과
        함께 서블릿은 자바의 대표적인 구현 분야가 됨. JSP는 서블릿 응용 기술로
        웹화면(HTML)에 자바코드를 사용해 웹 프로그램 개발 효율을 높임. 오랜동안
        웹개발의 기본 기술이었으나 수년전부터는 프론트엔드 기반 개발과 백엔드
        개발환경의 변화 등으로 인해 예전 보다 직접적인 사용 비율은 낮아짐.
        이클립스 1999년 IBM이 개발해 오픈소스로 기증한 자바 기반의 통합 개발도구
        플랫폼. 자바 성장에 크게 기여했으며 자바의 기본 통합 개발도구로 자리
        잡음. 이클립스 자체는 자바 이외의 언어 개발도 지원하는 개발 플랫폼
        개념임. 최근에는 상용 제품인 IntelliJ로 많은 사용자들이 이동(안드로이드
        스튜디오 영향도 있음). 모바일 인터넷 2000년대 초중반 휴대폰 보급 확산과
        함께 모바일 인터넷 적용 시도. 휴대폰에 자바 가상머신을 탑재해 자바
        프로그램을 실행시키고자 함. 휴대폰의 낮은 사양과 느린 인터넷 속도등으로
        크게 성장하지는 못함. 안드로이드 2007년 구글이 스마트폰 운영체제인
        안드로이드를 발표. OS 커널은 리눅스 기반이지만 응용 프로그램 개발의
        기본을 자바로 채택. 오라클과의 자바 라이센스 문제 등으로 인해 내장
        가상머신 변화 및 Kotlin 으로의 이동 가속화. 스프링프레임워크 2002년
        로드존슨 출판한 Expert One-on-One J2EE Design and Developement 책에
        기반. 2004년 1.0 발표 2019년 현재 5.x 버전이며 스프링부트로 인해 개발이
        간소화 됨. 대규모 시스템 개발(엔터프라이즈 환경)에 적합한 오픈소스
        프레임워크로 자바의 성장에 큰 역할을 함.
      </div>
    </Sheet.Content>
  );
}
