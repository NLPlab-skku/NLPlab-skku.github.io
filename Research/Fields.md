---
layout: default
title: Fields
---
<style>
@import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
.jg{font-family: 'Jeju Gothic', sans-serif;}

/* 박성완 추가 CSS */
/* 기본 스타일 */
    .toggle-container {
      cursor: pointer;
      font-weight: bold;
      color: #333;
      transition: color 0.3s ease, transform 0.3s ease;
    }

    /* 마우스를 올렸을 때 색과 크기 변화 */
    .toggle-container:hover {
      color: #28a745; /* 녹색 계열 */
      transform: scale(1.1); /* 글씨 커짐 */
    }

    /* 토글 리스트 스타일 */
    .toggle-list {
      display: none;
      list-style-type: none;
      padding-left: 20px;
    }

    .toggle-list li {
      margin: 5px 0;
    }

    .toggle-list a {
      text-decoration: none;
      color: #1a73e8;
      transition: color 0.3s ease;
    }

    /* 링크에 마우스를 올렸을 때 색 변화 */
    .toggle-list a:hover {
      text-decoration: underline;
      color: #28a745; /* 녹색 계열 */
    }
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

  <h2>1. 대화 시스템</h2>
  <p>대화 시스템(Dialogue System)은 인간과 컴퓨터 간의 상호작용을 가능하게 하는 기술이다.<p>
  <img src="/assets/img/research/Dialogue_System_v2.png">
  <p>일반적 대화는 문서와는 달리 구어체 표현을 사용하고, 생략 및 대용어 표현이 빈번히 나타나며, 표정이나 손짓 등 언어 이외의 다양한 수단을 통해 의사를 전달한다. 지능형 대화 시스템 개발은 유비쿼터스 환경에서 가장 유용한 <font color="seagreen" font-weight= "bold">HCI (Human Computer Interaction)</font> 기술이며, 지능형 로봇 개발 등에 사용되는 핵심 기술이다. 최근 대화 시스템이 발전하고 다양한 형태의 대화 데이터가 많아지면서 대화 시스템에 기대하는 사용자의 요구 또한 다양해졌다. 현재는 다음과 같은 다양한 대화 시스템의 소분야에 대한 연구를 진행하고 있다.<p>
  <ul>
	    <li>특정 도메인에 한정되지 않고 일반적인 상식을 가지고 다양한 도메인에 대해 사람과 대화하는 <font color="seagreen" font-weight= "bold">오픈 도메인 대화(Open-Domain Dialogue) 모델</font></li>
      <li>사용자의 특정 요구사항을 해결하고, 이와 관련된 답변을 제공하는 <font color="seagreen" font-weight= "bold">작업 지향 대화(Task-Oriented Dialogue) 모델</font></li>
      <li>사용자의 페르소나를 추출 및 분석하고, 이에 맞는 대화를 제공하는 <font color="seagreen" font-weight= "bold">페르소나 대화(Persona-based Dialogue) 모델</font></li>
      <li>다자 간의 대화 상황(토론, 토의 등)에서 대화를 분석하고, 해당 상황에서의 최선의 답변을 생성하는 <font color="seagreen" font-weight= "bold">다자간 대화(Multi-Party Dialogue) 모델</font></li>
      
  <br>
  <div class="toggle-container" onclick="toggleList_github1()">> Related Github</div>
  <ul class="toggle-list" id="github-list1">
      <li><a href="https://github.com/NLPlab-skku/HG-TODS" target="_blank">이종 그래프 융합 목적 지향 대화 시스템</a></li>
      <li><a href="https://github.com/NLPlab-skku/DSTC11_SIMMC2.1" target="_blank">가상환경 쇼핑 보조를 위한 대화형 인공지능 에이전트</a></li>
      <li><a href="https://github.com/NLPlab-skku/BERT-ASE" target="_blank">Gender bias 완화 모델 BERT-ASE</a></li>
  </ul>

  <div class="toggle-container" onclick="toggleList_demo1()">> Related Demo</div>
  <ul class="toggle-list" id="demo-list1">
      <li>외부 지식 기반 대화 시스템</li>
      <video controls style="display: block; margin: 0 auto;">
								<source src="/assets/video/demo_external_knowledge_based_dialogue_system.mp4" type="video/mp4">
								Your browser does not support the video tag.
			</video>

      <li>외부 지식 기반 대화 시스템</li>
      <video controls style="display: block; margin: 0 auto;">
								<source src="/assets/video/demo_external_knowledge_based_dialogue_system.mp4" type="video/mp4">
								Your browser does not support the video tag.
			</video>
  </ul>


  </ul>
  <br>

  <h2>2. 오픈 도메인 질의응답 시스템</h2>
  <p>Open-Domain QA(Open-Domain Question Answering)는 사용자가 제시한 질문에 대해 대규모의 비구조화된 데이터나 문서로부터 적절한 답변을 찾아 제공하는 시스템이다.<p>
  <img src="/assets/img/research/Open_domain_QA.png">
  <p>주로 인터넷이나 대규모 텍스트 데이터베이스에서 정보를 검색해 사용자가 원하는 답을 제공하는 방식으로 동작한다. 이러한 시스템은 검색 엔진, AI 기반 비서 등 여러 응용 분야에서 활용된다.
</p>
<p>아래 그림은 질의응답의 일반적인 구성을 보여주는 예시이다.</p>
  <img src="/assets/img/research/Open_domain_QA_2.png">
  <p>Open-Domain QA의 주요 구성 요소 및 핵심 기술은 다음과 같다.<p>
  <ul>
	    <li><font color="seagreen" font-weight= "bold">문서 검색(Document Retrieval):</font> 사용자의 질문과 관련된 문서를 대규모의 데이터베이스에서 찾아내는 단계이다. 이 단계에서는 전통적인 검색 엔진 기술이나 BM25, TF-IDF와 같은 정보 검색 기법이 사용된다.</li>
      <li><font color="seagreen" font-weight= "bold">질의 이해(Query Understanding):</font> 사용자가 입력한 질문의 의미를 이해하고, 질문에서 중요한 개체나 키워드를 추출하는 과정이다. 자연어 처리(NLP) 기술을 이용해 질문의 의도를 파악하고 필요한 정보를 찾아내기 위한 준비를 한다.</li>
      <li><font color="seagreen" font-weight= "bold">다정답 추출 및 생성(Answer Extraction and Generation):</font> 질문과 관련된 문서나 데이터에서 정답을 추출하거나 생성하는 과정이다. 기계 독해(Machine Reading Comprehension, MRC) 기술을 사용해 문서 내에서 질문에 가장 적합한 텍스트를 찾아 정답을 추출하거나, 검색된 문서의 정보를 입력받아 생성 모델을 통해 정답을 생성한다. 대표적인 모델로는 BERT, RoBERTa, T5 등이 있다.</li>
  </ul>
  <br>

  <h2>3. 정보 검색</h2>
  <p>정보검색 시스템(Information Retrieval System)은 대량의 데이터나 문서에서 사용자가 필요한 정보를 효과적으로 찾아주는 시스템이다.<p>
  <img src="/assets/img/research/Information_Retrieval.png">
  <p>인터넷 검색 엔진, 디지털 도서관, 기업 데이터베이스 등 다양한 분야에서 활용되며, 사용자의 질의에 따라 관련된 문서나 데이터를 검색해 제공한다. 오픈 도메인 질의응답 시스템에서 문서를 검색하는 과정과 일치하지만 답변 생성이 목적이 아닌 정확한 문서를 가져오는 것이 목적인 부분에서 차이가 존재한다. </p>
<p>정보검색 시스템의 주요 구성 요소 및 핵심 기술</p>
  <ul>
	    <li><font color="seagreen" font-weight= "bold">문서 컬렉션(Document Collection):</font> 검색 대상이 되는 모든 문서나 데이터의 집합이다. 문단 혹은 3~5개의 문장단위로 구성하여 사용하기도 한다. </li>
      <li><font color="seagreen" font-weight= "bold">색인(Indexing):</font> 문서에서 중요한 키워드나 특징을 추출해 색인을 생성하는 과정이다. 이를 통해 문서 검색이 빠르고 정확하게 이루어질 수 있다. 대표적인 방법으로 <font color="seagreen" font-weight= "bold">TF-IDF(Term Frequency-Inverse Document Frequency), DPR(Dense passage retrieval)</font> 등이 사용된다.</li>
      <li><font color="seagreen" font-weight= "bold">질의 처리(Query Processing):</font> 사용자가 입력한 질의를 이해하고, 시스템이 처리할 수 있는 형태로 변환한다. 자연어 질의의 경우, 형태소 분석과 같은 기술을 통해 핵심 키워드를 추출하고 검색 가능한 형태로 만든다.</li>
      <li><font color="seagreen" font-weight= "bold">검색 및 매칭(Search and Matching):</font> 색인된 문서와 사용자의 질의를 비교해 관련성 있는 문서를 찾아내는 과정이다. 문서와 질의 간의 유사도를 계산하여 가장 적합한 결과를 제공한다.</li>
      <li><font color="seagreen" font-weight= "bold">랭킹(Ranking):</font> 검색된 문서를 관련성이나 중요도에 따라 정렬하는 과정이다. <font color="seagreen" font-weight= "bold">랭킹 알고리즘</font>을 사용해 사용자가 찾고자 하는 정보의 우선순위를 결정하게 된다.</li>
  </ul>
  <br>

  <h2>4. 생성형 인공지능</h2>
  <p>Controllable Text Generation(조절 가능한 텍스트 생성)은 사용자가 원하는 특정 조건에 맞춰 텍스트를 생성하는 기술이다. 예를 들어, 생성되는 텍스트의 길이, 감정(긍정적, 부정적), 주제, 문체(격식적, 비격식적) 등을 제어할 수 있다.<p>
  
  <p>주요 개념</p>
  <ul>
	    <li><font color="seagreen" font-weight= "bold">속성 제어:</font> 텍스트의 특정 속성(예: 주제, 감정, 스타일 등)을 사용자가 설정한 대로 제어한다. 최근에는 단일 속성뿐만 아니라 다양한 속성을 제어하는 연구들이 활발하게 이루어지고 있다.
</li>
      <li><font color="seagreen" font-weight= "bold">조건부 생성:</font> 주어진 조건에 따라 텍스트를 생성한다. 예를 들어, 대화 시스템에서는 사용자 질문에 따라 적절한 답변을 생성할 수 있다.</li>
  </ul>
  <p>이 기술을 통해 사용자 맞춤형 텍스트 생성을 더 효율적으로 할 수 있어, 다양한 AI 응용 분야에서 활용되고 있다.<p>
  <br>
  <br>

  <h2>5. 텍스트 마이닝</h2>
  <p>텍스트 마이닝(Text Mining)은 대량의 텍스트 데이터에서 유용한 정보를 추출하고 패턴을 발견하는 과정이다. 주로 다음과 같은 주요 작업들이 포함된다<p>
  <ul>
	    <li><font color="seagreen" font-weight= "bold">텍스트 분류:</font> 텍스트를 사전에 정의된 카테고리 중 하나로 분류한다.</li>
      <li><font color="seagreen" font-weight= "bold">텍스트 요약:</font> 긴 텍스트에서 핵심 내용을 생략하지 않으면서  짧고 간결하게 요약하여 제공한다.</li>
      <li><font color="seagreen" font-weight= "bold">감성 분석:</font> 텍스트에서 감정이나 의견을 추출하여 긍정적, 부정적 또는 중립적인 감정을 분석한다.</li>
  </ul>
  <p>이러한 작업들은 자연어 처리 기술을 활용하여 이루어지며, 텍스트 데이터를 더 잘 이해하고 유용한 정보를 얻을 수 있다.<p>
  <p>NLPLAB에서 진행된 텍스트 마이닝 관련 Github Repository</p>
  <ul>
      <li><a href="https://github.com/NLPlab-skku/SummaryXAI-QA" target="_blank">설명가능한 오픈도메인 질의응답 시스템 구축을 위한 질의 기반의 문서 요약 기술</a></li>
      <li><a href="https://github.com/NLPlab-skku/MTL-KGC" target="_blank">Multi-Task Learning for Knowledge Graph Completion with Pre-trained Language Models</a></li>
  </ul>
  <br>

  <h2>6. 자연어 처리 기반 기술</h2>
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
  <p>또한 이와 더불어 소형 언어모델 (sLM), RAG (Retrieval-augmented Generation) 등의 최신 자연어처리 기반 기술 역시 보유중이다.</p>
    <p>NLPLAB에서 진행된 자연어 처리 기반 기술 관련 Github Repository</p>
  <ul>
      <li><a href="https://github.com/NLPlab-skku/RoSeLLa" target="_blank">한국어 기반 소형 언어 모델(sLM) RoSeLLa</a></li>
  </ul>
  <br>

<script>
    function toggleList_github1() {
      const list = document.getElementById('github-list1');
      if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }
    }

    function toggleList_demo1() {
      const list = document.getElementById('demo-list1');
      if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }
    }
</script>
