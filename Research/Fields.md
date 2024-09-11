---
layout: default
title: Fields
---
<style>
@import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
.jg{font-family: 'Jeju Gothic', sans-serif;}
</style>
<h4>Research</h4>
 <div class="linklink jg" style = "background-color:#ffffff;border-radius:0 15px;align:right;">
          <ul class="posts-list">
            <li>Fields(here)
            </li>
            <li class="post-link">
                <a class="post-title" href="https://nlplab-skku.github.io/Research/Projects/">Projects</a>
            </li>
            <li class="post-link">
                <a class="post-title" href="https://nlplab-skku.github.io/Research/Patents/">Patents</a>
            </li>
          </ul>
  </div>


<div class="post jg">
  <h1 class="pageTitle">Fields</h1>	
  <p class="meta">분야</p>

  <h2>1. 대화 시스템 (Dialogue System)</h2>
  <p>대화 시스템(Dialogue System)은 인간과 컴퓨터 간의 상호작용을 가능하게 하는 기술이다.<p>
  <img src="/assets/img/research/Dialogue_System_v2.png">
  <p>일반적 대화는 문서와는 달리 구어체 표현을 사용하고, 생략 및 대용어 표현이 빈번히 나타나며, 표정이나 손짓 등 언어 이외의 다양한 수단을 통해 의사를 전달한다. 지능형 대화 시스템 개발은 유비쿼터스 환경에서 가장 유용한 <font color="seagreen" font-weight= "bold">HCI (Human Computer Interaction)</font> 기술이며, 지능형 로봇 개발 등에 사용되는 핵심 기술이다. 일반적으로 다음과 같이 구성된다.</p>
  <img src="/assets/img/research/Dialogue_System_v2_2.png">
  <p>최근 대화 시스템이 발전하고 다양한 형태의 대화 데이터가 많아지면서 대화 시스템에 기대하는 사용자의 요구 또한 다양해졌다. 현재는 다음과 같은 다양한 대화 시스템의 소분야에 대한 연구를 진행하고 있다.<p>
  <ul>
	    <li>특정 도메인에 한정되지 않고 일반적인 상식을 가지고 다양한 도메인에 대해 사람과 대화하는 <font font-weight= "bold">오픈 도메인 대화(Open-Domain Dialogue) 모델</font></li>
      <li>사용자의 특정 요구사항을 해결하고, 이와 관련된 답변을 제공하는 작업 지향 대화(Task-Oriented Dialogue) 모델</li>
      <li>사용자의 페르소나를 추출 및 분석하고, 이에 맞는 대화를 제공하는 페르소나 대화(Persona-based Dialogue) 모델</li>
      <li>다자 간의 대화 상황(토론, 토의 등)에서 대화를 분석하고, 해당 상황에서의 최선의 답변을 생성하는 다자간 대화(Multi-Party Dialogue) 모델</li>
  </ul>
  <br>



  <h2>1. 자연어 처리 기반 기술</h2>
  <p> 자연어 이해 그룹에서는 자연어 문장의 구조를 인식하고 이를 의미구조로 변환해 주는 자연어 이해 시스템을 개발하는 것을 목표로 하고 있다. 현재 다음과 같은 언어 처리 모델들이 자연어처리에 필요한 기반 기술들이다.</p>
  <ul>
	<li>형태소 분석 (POS(Part-Of-Speech) Analysis)모델</li>
  	<li>개체명 인식 (Named-Entity Recognition) 모델</li>
  	<li>구문 분석 (Syntactic Analysis) 모델</li>
  	<li>의미 분석 (Semantic Analysis) 모델</li>
        <li>담화 분석 (Discourse Analysis) 모델</li>
        <li>대용어처리 (Anaphora Analysis) 모델</li>
        <li>단어 의미 중의성 (Word Sense Disambiguation) 해소 모델</li>
  </ul>
  <p>이들 자연어의 처리의 기반 기술은 <font color="seagreen" font-weight= "bold">정보검색</font>이나 <font color="seagreen" font-weight= "bold">데이터 마이닝</font> 등 여러 응용시스템에서 매우 유용하게 사용될 수 있다.</p>
  <p>아래의 예시는 본 연구실이 소장하고 있는 언어분석기(DANCHU)의 전체 구성도이다.</p>
  <img src="/assets/img/research/danchu_system.png">
  <br>
	
   <h2>2. 지능형 대화 (Intelligent Dialogue) 시스템</h2>
   <p>지능형 대화 시스템은 둘 이상의 화자들이 나누는 대화를 분석하는 기술이다.</p>
   <img src="/assets/img/research/IntelligentDialogue.jpg">
   <p>일반적 대화는 문서와는 달리 구어체 표현을 사용하고, 생략 및 대용어 표현이 빈번히 나타나며, 표정이나 손짓 등 언어 이외의 다양한 수단을 통해 의사를 전달한다. 지능형 대화 시스템 개발은 유비쿼터스 환경에서 가장 유용한  <font color="seagreen" font-weight= "bold">HCI (Human Computer Interaction)</font> 기술이며, 지능형 로봇 개발 등에 사용되는 핵심 기술이다. 다음과 같은 연구 분야가 있다.
</p>
  <ul>
	<li>화행 분석 (Speech Act Analysis) 모델</li>
  	<li>슬롯 필링 (Slot filling) 모델</li>
	<li>대화 상태 추적기 (Dialog State Tracking) 모델</li>
	<li>코퍼스 기반 대화 모델(Corpus-based Dialogue Model)</li>
	<li>계획 기반 대화 모델 (Plan-based Dialogue Model)</li>
	<li>전이망 기반 대화 모델 (RTN(Recursive Transition Network)-based Dialogue Model)</li>
	<li>자연어 생성 (Natural Language Generation) 모델</li>
  </ul>
<p>아래는 대화시스템의 전체 구성도이다.</p>
<img src="/assets/img/research/Dialogue_System.png">
<br>


   <h2>3. 감정 분류 (Sentiment Classification)</h2>
   <p>웹에 있는 대용량의 텍스트 정보 중 감정을 가지는 문장을 자동 추출하고 추출된 문장의 주제에 대한 감정(긍정/부정)을 알려주는 것이 목적이다.</p>
   <img src="/assets/img/research/SentimentClassification.jpg">
   
   <h2>4. 지능형 정보 검색 (Information Retrieval) 및 텍스트 마이닝 (Text Mining)</h2>
   <p>지능형 정보검색 및 텍스트 마이닝은 텍스트로 저장된 방대한 양의 데이터로부터 사용자가 정확한 정보를 <font color="seagreen" font-weight= "bold">효율적으로</font> 얻어낼 수 있도록 하는 정보시스템의 개발에 있다. 현재 연구하고 있는 내용들은 다음과 같다.</p>
  <ul>
	<li>지능형 정보 검색 (Intelligent Information Retrieval) 모델</li>
  	<li>문서 분류 (Text Classification) 모델</li>
	<li>문서 요약 (Text Summarization) 모델</li>
	<li>질의 응답 (Question/Answering) 시스템</li>
  </ul>
  <br>
  
  <h2>5. 비교 마이닝 (Comparison Mining) 시스템</h2>
  <p>웹에 있는 대용량의 텍스트 정보 중 비교 정보만을 자동 추출 및 분석하여 사용자에게 리포트를 제시한다. 예를 들어 아이폰4와 갤럭시S에 대한 비교 정보를 알고 싶을 때, 현재 검색사이트에서 는 두 제품과 관련된 문서들을 검색하여 순위대로 보여주지만, 비교마이닝 시스템은 각 문서들 내부의 내용까지 자동 분석하여 리포팅함을 목적으로 한다.</p>
 <img src="/assets/img/research/ComparisonMining.jpg">
 <br>
 
 <h2>6. 인공 신경망 기계 번역 (Neural Machine Translation) 시스템</h2>
 <p>NMT은 인공 신경망 기계번역을 뜻한다. 기존 SMT의 부족한 점을 보완한 번역 기술로써, 문장의 전체 맥락을 더 잘 이해하며 학습을 하여 사람처럼 자연스러운 번역 결과를 만들 수 있다.</p>
 <img src="/assets/img/research/NMT.png">
 <br>
 <h2>7. 기계 학습(Machine Learning)</h2>
 <p>기계 학습은 인공 지능의 한 분야로, 컴퓨터가 학습할 수 있도록 하는 알고리즘과 기술을 개발하는 분야를 말한다.
  Deep Learning은 데이터를 군집화하거나 분류하는 데 사용되는 추상화를 시도하는 기계학습 방법으로 인공신경망의 한계를 극복하기 위해 제안되었다.
  Topic Modeling은 대량의 텍스트에서 발생하는 추상적인 주제를 찾기 위한 통계 기반 기계학습 방법으로 여러 의미를 가진 단어의 사용을 구분할 수 있다.</p>
  <img src="/assets/img/research/topic.jpg">
  <ul>
	<li>Deep Learning</li>
  	<li>Topic Modeling</li>
  </ul>
  <br>
</div>
