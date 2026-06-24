# Search-R1: Training LLMs to Reason and Leverage Search Engines with Reinforcement Learning

URL: https://arxiv.org/pdf/2503.09516
Difficulty: MEDIUM
Progress: 완료
Study Date: 2025/08/22
Summary: 실시간 검색 및 전략적 정보 활용을 포함한 멀티 턴 LLM 추론 경로를 강화학습으로 최적화

## Contribution

- LLM의 검색 엔진을 활용한 추론 시나리오에 대한 구현 및 문제점 분석
- 안정적인 RL 학습을 위한 검색된 토큰 마스킹, multi-turn 교차 추론 & 검색,
    
    효과적이고 간단한 결과 기반 보상 함수를 포함한 새로운 프레임워크 제시
    
- RAG 베이스라인 대비 큰 성능 향상

### Abstract

  추론 능력을 가진 LLM이 검색 엔진을 사용하는 것은 보통 완벽하지 않은데, 그

이유는 검색 엔진과 최적으로 상호작용하는 방법을 알지 못하기 때문. 이를 강화

학습으로 해결하자. 방법은 LLM이 실시간으로 검색을 하는 multi-step 추론

과정에서 여러 개의 검색 쿼리를 자동으로 생성해서 검색함. Search-r1은

멀티 턴의 LLM 추론 경로를 최적화함.

1. RL 학습을 위한 검색된 토큰 마스킹
2. 단순한 outcome-based의 보상 함수

### 1. Introduction

  RL은 논리적 추론과 문제 해결 능력에서 강점을 가질 수 있음. 경험과 피드백을

받아서 이로부터 업데이트하기 때문. LLM의 search-and-reasoning 시나리오는

아래와 같은 세 가지 문제를 고려해야 함

1. 안정성
    - LLM이 추론에 검색된 내용을 어떻게 활용해야 하는지는 항상 의문
2. Multi-turn의 추론 및 검색 교차 과정
    - 여러 턴 동안 동적으로 검색 전략을 바꾸는 것이 중요함
3. 보상 설계
    - 단순히 결과 중심의 보상이 검색 & 추론에 효과적인지는 의문임

Search-R1은 이에 따라 4개의 토큰을 도입하여 제어하고자 함

`<search>, </search>`: 검색 행동 촉발

`<information>, </information>`: 검색된 정보 wrapper, 학습 토큰 마스킹

`<think>, </think>`: 추론 step wrapper

`<answer>, </answer>`: 최종 답변

### 2. Methods

**Reinforcement Learning with a Search Engine**

본 연구에서는 $\pi_{\theta}(\cdot | x)$로 인풋에만 의존하는 이전 RL 방법론들

여기서는 관점을 바꿔서 $\pi_{\theta}(\cdot | x;R)$로 **명시적으로 검색기를 포함**함.

PPO와 GRPO는 모두 전체 rollout sequence에서 토큰 수준의 손실이 계산됨.

LLM이 생성한 토큰을 최적화하는 것은 검색기와의 상호작용 및 추론 성능을

높이는 데에 도움이 되지만, 검색된 토큰에 대해 손실을 적용하는 것은 의도치 않은

학습 결과로 이어질 수 있음. 따라서 **검색된 토큰에 대해서는 loss masking**을 함.

(`<information>` 토큰) 

이 과정은 학습 안정성을 높이는 데에 기여함.

**Generation with Multi-turn Search Engine Calling**

LLM의 rollout process를 다음과 같이 나타낼 수 있음

$$
y \sim \pi_{\theta}(\cdot |x;R)=\pi_{\theta}(\cdot |x)\otimes R
$$

이 과정은 LLM이 텍스트 생성과 외부 검색을 번갈아 함. 검색이 필요할 때는

검색 쿼리를 생성하고 <search>, </search>로 래핑. 이 토큰이 감지되면

시스템은 검색 쿼리를 파싱 후 검색함. 검색된 정보는 special 검색 토큰인

<information>, </information>으로 감싸고 rollout 계속 진행함. 다음 스텝을

위한 추가 정보로 쓰임. 최대 행동 횟수 혹은 모델이 답변을 생성할 때까지 반복

**Training Template**

![Screenshot from 2025-08-24 13-00-11.png](Screenshot_from_2025-08-24_13-00-11.png)

새로운 정보를 얻을 때마다 <think>, </think> 토큰 안에 추론을 진행함

**Reward Modeling**

$$
r_{\phi}=EM(a_{pred},a_{gold})
$$

단순히 정답 간의 문자열 매칭으로 보상을 줌, {0, 1}

### 3. Experiments

- Dataset
    - Open-Domain QA: NQ, TriviaQA, PopQA
    - Multi-Hop QA: HotpotQA, 2WikiMultiHopQA, Musique, Bamboogle
- Baselines
    - Inference without Retrieval: CoT
    - Inference with Retrieval: RAG, IRCoT, Search-o1
    - Fine-Tuning-Based Methods: SFT, R1
- Models
    - Policy models
        - Qwen-2.5-3B (Base / Instruct)
        - Qwen-2.5-7B (Base / Instruct)
    - Retriever
        - E5, # of retrieval = 3
    - Maximum action budget = 4

Training은 NQ와 HotpotQA로만. 나머지는 평가 데이터셋

Inference-style 베이스라인에서는 instruction 모델만 사용함, base는

instruction을 따르는 데에 실패했기 때문

RL에서는 두 모델 다 사용해봄

PPO를 기본으로, GRPO는 추가 실험으로 함

**In-Domain / Out-of-Domain**

![Screenshot from 2025-08-24 14-19-36.png](Screenshot_from_2025-08-24_14-19-36.png)

Search-R1이 지속적으로 베이스라인을 넘어섬. 7B는 41%, 3B는 20% 향상

R1은 retrieval 없는 RL, 이것보다 성능이 많이 증가했으므로 효과적으로

검색 엔진을 통합했다는 것을 의미함. 또한 base, instruct에서 모두 효과적임.

마지막으로 모델 사이즈가 작다면 Insturct-tuning된 것이 더 효과적이었음

### 4. Analysis

**PPO vs GRPO**

![Screenshot from 2025-08-24 14-22-16.png](Screenshot_from_2025-08-24_14-22-16.png)

![Screenshot from 2025-08-24 14-39-05.png](Screenshot_from_2025-08-24_14-39-05.png)

성능 면에서는 모델 사이즈에 따라 달랐음. GRPO가 더 빨리 수렴하는 모습을

보임. 아마도 PPO는 분리된 value function을 추가로 사용하기 때문. 이것은

추가적인 warm-up stage 필요. 그러나 GRPO는 학습이 많이 진행되면 보상

붕괴가 일어났으므로 **PPO가 더 안정적인 학습 방법**인 거 같음

**Base vs Instruct**

![Screenshot from 2025-08-24 14-42-04.png](Screenshot_from_2025-08-24_14-42-04.png)

초반의 학습 보상은 Instruct가 더 높았지만 결국 둘다 비슷한 성능으로 수렴함

Instruct는 기본적으로 선호도 학습이 되어있기 때문으로 여겨짐

**Effectiveness of Valid Search**

![Screenshot from 2025-08-24 14-45-36.png](Screenshot_from_2025-08-24_14-45-36.png)

100 스텝을 기준으로 응답 길이와 학습 보상이 크게 증가하는 모습을 볼 수 있음

이는 Valid search의 평균적인 수가 늘어남에 따른 결과로 해석 가능함. 학습

보상이 크게 증가하는 것은 곧 **검색을 정답 추론에 잘 통합**했다는 뜻

**Retrieved Token Masking**

![Screenshot from 2025-08-24 14-36-11.png](Screenshot_from_2025-08-24_14-36-11.png)

확실히 검색된 내용은 손실 계산에서 제외하는 것이 모델 최적화에 효과적임

**Larger Model**

![Screenshot from 2025-08-24 15-11-40.png](Screenshot_from_2025-08-24_15-11-40.png)

Base가 훨씬 더 잘함

**Generation example**

![Screenshot from 2025-08-24 15-15-18.png](Screenshot_from_2025-08-24_15-15-18.png)

Retriever가 어느 정도 성능이 나온다는 가정이 필요함. 속도는 꽤나 느릴 듯