# Reasoning on Graphs: Faithful and Interpretable Large Language Model Reasoning

Conference: ICLR 2024
Date: August 13, 2026 2:31 PM

# 📝 Paper Info

**URL**: [Reasoning on Graphs: Faithful and Interpretable Large Language Model Reasoning | OpenReview](https://openreview.net/forum?id=ZGNWW7xZ6Q)

**GitHub**: https://github.com/RManLuo/reasoning-on-graphs

---

# 📕 Introduction

 지식 그래프 기반 QA (KGQA) 연구는 크게 두 갈래로 나누어 볼 수 있다. 첫 번째는 LLM의 추론 능력을 이용해 질의로부터 KG에 실행 가능한 path를 생성함으로써 정답을 찾는 것이고, 두 번째는 KG에서 triplet을 직접 검색하여 검색된 triplet을 지식 context로 사용하는 것이다. 그러나 전자의 경우는 LLM이 실행 불가능한 path를 생성하는 경우가 있고, 후자의 경우는 KG를 아예 지식 베이스로만 취급하여 추론의 구조적 정보의 중요성을 간과하고 있다고 지적한다.

<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

KGQA 작업에서 LLM이 정답을 예측하는데 실패한 예시

 본 연구는 위의 문제들을 해결하기 위한 방법으로서, planning-retrieval-reasoning 프레임워크를 제안한다. 실제 KG에 유효한 path를 생성하는 planning module과, 유효한 path를 바탕으로 그래프를 탐색하여 추론을 진행하는 retrieval-reasoning module을 학습하는 방법을 제안한다.

---

# 📚 Preliminary

논문에서 나오는 주요 notation을 정리하자면 아래와 같다.

### Knowledge Graph (KG)

지식 그래프는 여러 triple의 집합으로 구성된다. $\mathcal{E}$는 엔티티 집합이고, $\mathcal{R}$은 관계 집합이다.

$$
\mathcal{G}=\{(e,r,e')|e,e'\in\mathcal{E},r\in\mathcal{R}\}
$$

### Relation Paths

$$
z=\{r_1,r_2,\dots,r_l\},\text{ where }r_i\in\mathcal{R}
$$

### Reasoning Paths

reasoning path는 $z$의 instance라고 할 수 있다.

$$
w_z=e_0\xrightarrow{r_1}e_1\xrightarrow{r_2}\cdots\xrightarrow{r_l}e_l
$$

---

# ⚙️ Methodology

<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image 1.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>

Overall Framework

## Framework

 KG 연구에서 relation path를 사용하는 경우가 잦은데, relation path를 사용하는 이유에 대해 설명한 원문은 다음과 같다. “compared to the dynamically updated entities, the relations in KGs are more stable”

설명이 명쾌하지 않지만, 저자들이 그렇게 언급한 의도를 생각해보았을 때, 구체적인 엔티티/사실보다는 relation 유형으로 구성된 패턴이 상대적으로 더 오래 재사용할 수 있기 때문이라고 생각한다. 즉, 질의로부터 relation 패턴을 파악할 수 있다면, 지식 그래프에서 해당 패턴과 유사한 path를 탐색하여 정답을 얻을 수 있을 것이라는 직관을 제시한다.

 그래서 relation path를 하나의 plan으로 보고, LLM이 그래프에 사용 가능한 path를 생성하도록(plan을 세우도록) 하는 것이 목표이지만, 두 가지의 문제가 있다. 앞서 언급한 바와 같이, LLM이 직접 grounded path를 생성하지 못할 가능성이 크고, 설령 path를 제대로 탐색했다 쳐도 reasoning path를 제대로 이해하지 못할 수 있다.

따라서 LLM이 올바른 relation path를 생성하고, 생성한 relation path를 바탕으로 탐색된 reasoning path를 이해하기 위해서는 아래와 같이 주어진 질의를 바탕으로 지식 그래프로부터 정답을 추론할 가능성을 높이도록 최적화 해야 한다.

$$
P_\theta(a|q,\mathcal{G})=\sum_{z\in\mathcal{Z}}P_\theta(a|q,z,\mathcal{G})P_\theta(z|q)
$$

- $P_\theta(a|q,z,\mathcal{G})$ : 질의, relation path, 지식 그래프가 주어졌을 때, 정답 $a$를 생성할 확률
- $P_\theta(z|q)$ : 질의가 주어졌을 때, relation path를 생성할 확률

## Optimization

 단순히 $P_\theta(a|q,\mathcal{G})$ 확률을 최대화하면 좋겠지만, 해당 확률을 정확히 구하기 위해서는 가능한 모든 관계 경로 $\mathcal{Z}$를 알아야 한다. 그러나 이는 현실적으로 불가능하므로, 해당 확률에 근사하도록 하한선을 최대화하는 evidence lower bound (ELBO)를 사용해 최적화하는 방향으로 간다.

$$
\log P(a|q,\mathcal{G})\ge\mathbb{E}_{z\sim Q(z)}[\log P_\theta(a|q,z,\mathcal{G})]-D_{KL}(Q(z)\|P_\theta(z|q))
$$

$Q(z)$는 그래프 내 relation path의 사후 분포를 의미한다.

### Planning Optimization

해당 단계에서는 LLM이 relation path를 잘 생성하도록, 지식 그래프의 지식을 LLM으로 증류하는 과정이다. 그러기 위해서는 사후 분포 $Q(z)$를 구해야 하지만, 분포를 직접 구하기 어려우니 Uniform 분포로 가정해서 근사하도록 한다.

$$
Q(z)\simeq Q(z|a,q,\mathcal{G})=\begin{cases}\frac{1}{|\mathcal{Z}|},\exists w_z(e_q,e_a)\in\mathcal{G},\\0,else\end{cases}
$$

$\mathcal{Z}$ 마찬가지로 직접 구할 수 없으니, 가장 짧은 relation path $\mathcal{Z}^*\subseteq\mathcal{Z}$ 만 사용하여 supervision signal을 준다. 사실상 grounded relation path를 생성할 확률의 평균을 사용한다는 의미로 볼 수 있겠다.

위 내용을 종합하여 plan loss를 정의하면 아래와 같다.

$$
\mathcal{L}_\text{plan}=D_{KL}(Q(z)\|P_\theta(z|q))=D_{KL}(Q(z|a,q,\mathcal{G})\|P_\theta(z|q))\simeq -\frac{1}{|\mathcal{Z}^*|}\sum_{z\in\mathcal{Z}^*}\log P_\theta(z|q)
$$

### Retrieval-Reasoning Optimization

이제 검색된 여러 reasoning path에 대해 추론을 진행할 수 있도록 해야 한다. retreival-reasoning molue에 FiD 프레임워크를 적용해서 추론할 수 있도록 적용했는데, 이에 대한 수식은 아래와 같다.

$$
P_\theta(a|q,\mathcal{Z},\mathcal{G})=\prod_{z\in\mathcal{Z}}P_\theta(a|q,z,\mathcal{G})
$$

Planning Optimization과 동일하게 relation path $\mathcal{Z}^*\subseteq\mathcal{Z}$ 를 사용하고, $\mathcal{Z}^*$ 중에서 K개를 샘플링하여 근사하도록 한다. reason loss를 정의하면 아래와 같다.

$$
\mathcal{L}_\text{reason}=\mathbb{E}_{z\sim Q(z|a,q,\mathcal{G})}[\log P_\theta(a|q,z,\mathcal{G})]=\sum_{z\in\mathcal{Z}^*_{K}}\log P_\theta(a|q,z,\mathcal{G})=\log P_\theta(a|q,\mathcal{Z}^*_K,\mathcal{G})
$$

plan loss와 reason loss를 모두 구했으니, 둘 모두를 최적화하는 loss를 정의할 수 있다. 따라서 최종 RoG의 목적 함수는 아래와 같다.

$$
\mathcal{L}=\underbrace{\log P_\theta(a|q,\mathcal{Z}^*_K,\mathcal{G}}_\text{Retrieval-reasoning})+\underbrace{\frac{1}{|\mathcal{Z}^*|}\sum_{z\in\mathcal{Z}^*}\log P_\theta(z|q)}_\text{Planning}
$$

## Planning Module

프롬프트를 통해 planning modlue이 relation path를 생성하도록 한다. 

<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image 2.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>


valid relation path는 $z=\text{<PATH>}\space r_1\space\text{<SEP>}\space r_2\space\text{<SEP>}\dots\text{<SEP>}\space r_l\space\text{</PATH>}$ 와 같은 형식으로 생성되며, $\text{<PATH>},\text{<SEP>},\text{</PATH>}$은 특수 토큰을 나타낸다.

이에 따라 plan loss를 더 구체화해보면, 아래와 같이 표현할 수 있을 것이다.

$$
argmax_\theta\frac{1}{|\mathcal{Z}^*|}\sum_{z\in\mathcal{Z}^*}\log P_\theta(z|q)=\frac{1}{|\mathcal{Z}^*|}\sum_{z\in\mathcal{Z}^*}\log\prod^{|z|}_{i=1} P_\theta(r_i|r_{<i},q)
$$

## Retrieval-Reasoning Module

### Retrieval

retrieval module의 목표는 주어진 question과 생성된 relation path를 가지고 실제 KG의 reasoning path를 검색하는 것이다.

$$
\mathcal{W}_z=\{w_z(e_q,e_*)|w_z(e_q,e_*)=e_q\xrightarrow{r_1}e_1\xrightarrow{r_2}\dots\xrightarrow{r_l}e_{a*},w_z(e_q,e_*)\in\mathcal{G}\}
$$

지식 그래프에서 $w_z$를 BFS로 검색하고, 검색된 path는 추론 과정에서 모두 사용한다. 이는 검색된 reasoning path에 노이즈가 있거나 질문과 연관이 없는 경우도 있을 수 있기 때문에, 추론을 통해 실제로 중요한 path를 식별하기 위함이다.

### Reasoning

reasoning module은 주어진 question, 검색된 reasoning path를 가지고 정답을 생성하는 것이 목표이다. reasoning path 집합 $\mathcal{W}_z$을 알고 있으니, reason loss를 아래와 같이 구체화할 수 있다.

$$
argmax_\theta\log P_\theta(a|q,\mathcal{Z}^*_K,\mathcal{G})=\log\sum_{z\in\mathcal{Z}^*_K}\sum_{w_z\in\mathcal{W}_z}\prod^{|a|}_{i=1}P_\theta(t_i|t_{<i},q,w_z)
$$

# 📊 Experiments

## Experiment Setup

- **Dataset**
    - WebQuestionSP (WebQSP)
    - Complex WebQuestions (CWQ)
    - Freebase → 그래프 구축에 사용한 데이터셋
- **Baselines**
    - Embedding-based methods, Retrieval-augmented methods, Semantic parsing methods, LLMs, LLMs+KGs methods로 그룹을 나누어 총 21개의 베이스라인을 평가했다
- **Evaluation Metric**
    - Hist@1: 예측한 정답이 여러 정답들 중 하나라도 맞은 비율
    - F1
- **Implementation**
    - LLM: LLaMA2-Chat-7B
    - relation path 생성 개수: 3

## Results

<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image 3.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>


<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image 4.png' | prepend: site.baseurl }}" style="max-width:60%; height:auto;"></p>


- reasoning module을 제거했을 때 Recall이 높아지지만, 검색된 path에 노이즈가 있기 때문에 precision은 감소하는 경향을 보임

<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image 5.png' | prepend: site.baseurl }}" style="max-width:50%; height:auto;"></p>


- RoG를 적용했을 때 일관적인 성능 향상을 보임

<p align="center"><img src="{{ '/assets/board/2026/08/REASONING_ON_GRAPHS/image 6.png' | prepend: site.baseurl }}"  max-width="100%" height="auto"></p>


- 후보 relation path 수 K를 늘릴수록, 이에 따라 cover되는 정답 수가 증가함 (recall)
- K가 너무 크면 reasoning path에 더 많은 노이즈와 검색 시간이 발생하기 때문에, 메인 실험에 K=3으로 세팅했다고 함