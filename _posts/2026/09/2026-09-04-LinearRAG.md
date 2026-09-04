---
layout: post
title:  "LinearRAG: Linear Graph Retrieval Augmented Generation on Large-Scale Corpora"
date:   2026-09-04
description: 
author: "이준서"

---

# LinearRAG: Linear Graph Retrieval Augmented Generation on Large-Scale Corpora

Conference: ICLR 2026
Date: September 2, 2026 2:45 PM

# 📝 Paper Info

URL: [LinearRAG: Linear Graph Retrieval Augmented Generation on Large-scale Corpora | OpenReview](https://openreview.net/forum?id=mCtfkypdm6)

GitHub: https://github.com/DEEP-PolyU/LinearRAG

---

# 📕 Introduction

Graph-based RAG는 Naive RAG보다 성능이 하락하는 경우가 많은데, 이에 대한 이유로 저자들은 그래프 구축 성능이 낮기 때문이라고 지적한다. 구체적으로 보면 아래와 같이 두 가지의 이유를 볼 수 있다.

1. **Local Inaccuracy**: 관계 추출 모델이 종종 사실과 다른 triple을 추출하기 때문에, 엔티티간 의미적 관계가 부정확해 진다.
2. **Global Inconsistency**: triple은 개별적인 텍스트 passage에서 국소적으로 추출하지만, 전체 corpus에 걸쳐 연결을 보정하거나 검증하는 방법이 없기에 모순되거나 중복되는 relation이 형성될 수 있다. 

예) “NLP”, “CV”는 “AI”의 subfield에 포함되고, “Unsupervised Learning”은 “NLP”, “CV”에서 사용하는 기술이지만, 실제 그래프에서는 “NLP”, “CV”, “Unsupervised Learning” 모두 “AI” 엔티티에 병렬적으로 연결되어 있는 형태임. 그래프에서 형성된 구조적 모호함과 계층적 coherence의 부재를 지적한 것.

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

위 사진에서 (a)를 참고하면, Graph-based RAG 방법에서는 Evidence Recall이 높은데 Context Relevance가 상당히 하락하는 모습을 보인다. 이에 대한 원인을 구축된 그래프의 품질이 좋지 않았기 때문이라고 저자들이 지적하지만, 정확한 인과 관계는 추가적인 분석이 더 필요하다고 생각된다.

(RAPTOR는 트리 구조의 요약문을 노드로 사용하고, LightRAG는 엔티티/관계 설명과 원본 청크를 함께 사용하는 등 각 베이스라인은 passage 단위나 구축된 그래프 구조 자체가 아예 다르다. 단순히 위 결과를 통해 얻을 수 있는 사실은 ‘그래프 기반 검색 결과에 노이즈가 많다’까지라고 생각한다.)

어쨌든, 논문의 요는, 굳이 relation을 추출하는 것이 불필요할 뿐만 아니라 연산량이 많다는 것이다. 정렬된 entity들은 passage에 분산된 정보를 연결하는 주요 anchor 역할을 하고, relation은 이미 원본 passage에 잘 보존되어 있기 때문에 relation을 따로 추출할 필요가 없다.

이러한 관점에서 그래프를 검색할 때, 그래프를 벡터/행렬 표현으로 변환하여 연산한다면 매우 효율적으로 그래프 RAG를 수행할 수 있다는 것이 본 논문의 메인 contribution이다.

---

# ⚙️ Methodology

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 1.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

## 1. Token-Free Graph Construction

LLM의 tokenizer를 사용하지 않고, SpaCy 라이브러리의 BERT기반 경량화 모델을 사용하여 그래프를 구축한다고 한다.

먼저, 그래프의 효율적인 업데이트를 위해 여러 granularity를 가진 계층적 그래프를 구축한다. passage set $\mathcal{P}$가 주어지고, 각 passage를 여러 문장으로 나눈 sentence set $\mathcal{S}$가 주어진다. 그리고, 경량화 모델로 NER하여 entity set $\mathcal{E}$를 얻는다. 해당 과정을 통해 얻은 passage, 문장, 엔티티 노드들을 각각 $V_p,V_s,V_e$로 정의한다.

edge는 각 passage, sentence 노드가 엔티티를 포함하는지 여부를 판단하여 연결된다. 즉, passage $p_i$가 엔티티 $e_j$를 포함하면 $(V_{p_i},V_{e_j})$의 edge가 추가되는 것이고, sentence $s_i$가 엔티티 $e_j$를 포함하면 $(V_{s_i},V_{e_j})$의 edge가 추가되는 식이다.

이렇게 하여 두 가지의 adjacency 행렬을 아래와 같이 만든다.

$$
C=[C_{i,j}]_{|V_p|\times|V_e|},\quad\text{where}\quad C_{ij}=1{\{p_i\text{ contains }e_j\}}
$$

$$
M=[M_{i,j}]_{|V_s|\times|V_e|},\quad\text{where}\quad M_{ij}=1{\{s_i\text{ mentions }e_j\}}
$$

$C$는 passage와 엔티티의 연결 정보를, $M$은 문장과 엔티티의 연결 정보를 담는다. 연결되면 1, 아니면 0이 된다.

## 2. Passage Retrieval

(설명하기에 앞서, 실제 구현된 코드와 논문의 수식이 맞지 않는 부분이 많아서 수식을 조금 교정했습니다. 글을 읽는데 참고하시길 바랍니다.) 

Multihop query의 경우, 관련 context의 precision과 recall의 균형을 맞춰야 하므로 검색을 메커니즘 디자인은  매우 중요하다. 이를 위해, 저자들은 검색 과정을 두 가지로 나누었다.

### 1. First Stage (Relevant Entity Activation via Semantic Bridging)

일반적으로 엔티티의 수가 매우 많기 때문에, 엔티티를 직접 매칭하는 것으로 Multihop relation을 이어주는 중간 엔티티(latent connector)를 식별하기가 어렵다. 이에 저자들은 **semantic bridging을 이용한 relevant entity activation 방법**을 제안한다.

먼저, 벡터 공간에서 쿼리 엔티티와 일치하는 지식 그래프의 엔티티들을 식별해야 한다. SpaCy를 이용해 쿼리 $q$로부터 추출한 엔티티를 $E_q$라고 하자. 그러면, 다음과 같이 유사도를 기반으로 초기 activation score를 구할 수 있다.

$$
\mathbf{a}_q=[\mathbf{a}_{q,i}]_{|V_e\cup V_p|\times1},\quad\text{where}\quad\mathbf{a}_{q,i}={1}\{i=\argmax_{e_j\in V_e}\text{sim}(e_q,e_j)\}\cdot\text{sim}(e_q,e_i)
$$

해석해보면, 쿼리와 가장 유사한 노드의 인덱스 자리에만 1로 표기하고 나머지를 0으로 둔 후, 1로 표기된 자리에 유사도 값을 저장하겠다는 뜻이다.

다음은 쿼리와 연관된 문장의 분포를 가진 벡터를 저장할 것이다. $q$와 각 문장 $s\in S,\text{where }S=\{s_1,s_2,\dots,s_{|S|}\}$ 사이의 문맥적 관계를 아래와 같이 계산한다.

$$
\sigma_q=[\sigma_{q,i}]_{|S|\times1},\quad\text{where}\quad\sigma_{q,i}=\text{sim}(q,s_i)
$$

이제 지식 그래프에서 multihop relation을 이어주는 중간 엔티티를 활성화하기 위해, $\sigma_q$의 유사도를 전파하는 과정이 필요하다.

$$
\mathbf{a}^t_q=\max(M^T(\sigma_q\odot(M\mathbf{a}^{t-1}_q)),\mathbf{a}^{t-1}_q)
$$

$\mathbf{a}^t_q$는 $t$번째 iteration에서의 엔티티 활성 벡터이다. 여러번 반복하다 보면, 쿼리의 추론 구조와 일치하는 서브 그래프를 고정하는 역할을 하는 관련 엔티티들을 식별할 수 있다. 이는 GraphRAG 알고리즘의 relation-matching 과정을 모방한 것인데, GraphRAG와의 차이점은 명시적인 relation 뿐만 아니라 암묵적인 relation까지 포착할 수 있다는 점이라고 한다.

첫 단계의 모든 과정은 행렬 크기가 적으면 효율적인 구조이지만, 실제 문장과 엔티티의 수는 매우 많기 때문에 당연히 search space도 매우 클 것이다. 이에 대해 임계값 $\delta$를 별도로 설정하여 유사도 값이 $\delta$를 넘기지 못하면 pruning하고, 그렇지 않다면 유지하는 식으로 탐색 범위를 좁힐 수 있다고 한다고 주장한다.

### 2. Second Stage (Passage Retrieval via Global Importance Aggregation)

첫 단계는 Passage 검색을 위한 초기 Seed node 식별 과정이다. 두 번째 단계에서는 식별된 Seed node로부터 서브 그래프 탐색을 진행하는 과정이다.

노드 $v_i\in V_p\cup V_e$ 의 중요도는 기본적으로 첫 단계에서 구한 $\mathbf{a}^{(i)}_{q}$ 값으로 설정된다. 그런데 이건 엔티티 노드만을 고려한 초기 값이고, passage 노드를 고려한 초기 값을 아직 구하지 못했다. 아래는 초기 passage 중요도를 계산하는 수식이다.

$$
\mathbf{b}_q=\Bigg[\lambda\cdot \text{sim}(q,v)+\ln\Bigg(1+\sum_{e_i\in E_a}\frac{\mathbf{a}^{(i)}_{q}\cdot\ln(1+N_{e_i})}{L_{e_i}}\Bigg)\Bigg]\cdot W_p
$$

- $E_a$ : 첫 단계에서 활성화된 엔티티 집합
- $N_{e_i}$ : passage $v$에 언급된 엔티티 $e_i$의 수
- $L_{e_i}$ : 엔티티 $e_i$의 계층 수
- $W_p$ : passage 노드의 가중치
- $\lambda$ : trade-off 계수 (하이퍼파라미터)

이제 초기 중요도 값을 모두 구했으니, Personalized PageRank 알고리즘을 사용해 각 노드 $v_i$ 의 중요도 $I(\cdot)$를 구하게 된다. 아래는 그 수식이다. 

$$
I(v_i)=(1-d)\mathbf{p}+d\cdot\sum_{v_j\in B(v_i)}\frac{I(v_j)}{\deg(v_j)}
$$

- $d$ : PPR의 damping factor (통상적으로 0.85로 세팅됨)
- $B(v_i)$ : 노드 $v_i$에 연결된 노드들의 집합
- $\deg(v_j)$ : 노드 $v_j$로부터 나가는 edge(outgoing link)의 수
- $\mathbf{p}$ : 개인화 벡터, 여기에 초기 중요도 값이 들어감

$$
\mathbf{p}=\mathbf{a}_q+\mathbf{b}_q
$$

---

# 📊 Experiments

## Experiment Setup

### Dataset

- Multi-hop QA 기반인 HotpotQA, 2WikiMultiHopQA, MuSiQue, GraphRAG-Bench (Medical dataset만 사용)

### Baselines

- **Zero-shot LLM**: Llama3-8B, Llama3-13B, GPT-3.5-turbo, GPT-4o-mini
- **Vanilla RAG**: GPT-4o-mini, RerankRAG, RCOT
- **SOTA Graph-based methods**: KGP, G-Retriever, RAPTOR, $\text{E}^2$GraphRAG, LightRAG, HippoRAG, GFM-RAG, HippoRAG2

### Evaluation Metrics

- Contain-Match Accuracy (Contain-Acc.): 생성 답변이 정답을 포함하는지 체크
- GPT-Evaluation Accuracy (GPT-Acc.): 생성 답변이 정답에 가까운지 LLM이 채점
- Medical 데이터셋에 한정하여 GPT-Acc만 사용
- 검색 퀄리티 평가는 아래와 같은 metric 사용
    - Context Relevance: 질의와 검색된 passage 간의 의미적 alignment 측정 (LLM 기반)
    - Evidence Recall: 검색된 passage가 필요한 모든 정보를 포함하고 있는지 측정 (LLM 기반)

### Results

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 2.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 3.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

- 2WikiMultiHopQA 데이터셋을 대상으로 연산 효율성 측정
- LLM 토큰을 사용하지 않으므로 Token 소비량은 당연히 0
- 매우 우수한 indexing, retrieval 효율성을 보임

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 4.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

- Entity Activation을 빼면 Global Importance도 못구하므로, w/o Entity Activation의 성능이 가장 낮음. 즉,  PPR이 아닌 PR만 돌렸을 때 성능.
- w/o Global Importance Aggregation만 진행했을 때 LinearRAG 대비 성능이 하락함. 국소적인 영역 뿐 아니라 전역적인 부분도 고려해야 함을 의미

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 5.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

- 초기 entity activation을 구할 때, activation이 dense하게 되는 것을 방지하기 위해 pruning을 사용했었음
- pruning을 아예 안하면 검색 시간이 거의 2배 정도 차이가 남

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 6.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

- Evalutor를 바꾸었을 때 성능 측정. 일관적으로 성능이 매우 우수한 모습을 보임
- LLM의 bias 영향을 크게 받지 않음을 알 수 있음

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 7.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

- threshold $\delta$, coefficient $\lambda$의 민감도 분석
- $\delta$의 경우는 크게 민감하지 않지만, $\lambda$ 값은 상당히 민감한 모습을 보임

<p align="center"><img src="{{ '/assets/board/2026/09/LinearRAG/image 8.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

- Graph Size는 노드 수를 의미함