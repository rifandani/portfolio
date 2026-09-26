---
slug: governance-is-the-new-code-review
title: Governance is the new code review
summary: AI can write a change in seconds and break production just as fast, but it cannot take the blame. Compliance checks make an engineer own every change.
publishedAt: 2026-09-26
previewSrc: /previews/governance-is-the-new-code-review.svg
previewAlt: Three merge request checkboxes, two ticked and one empty, beside a bot thread that asks for test evidence and impact
---

Every merge request (MR) opened now goes through two compliance checks. One lets me merge and records what I skipped. The other blocks the merge until I answer it. Neither one looks at the quality of the code. They check whether I can show that I understood, tested, and thought through the change I am shipping.

## The checklist that remembers

Almost every repo in my company now connects to our internal AI Engineering Operations Platform through a bot webhook. Every MR must include an "Engineer Checklist", and the MR author ticks each box. Here's the example of the checklist:

```
[ ] I understand the business context and implemented correctly
[ ] I have tested my changes thoroughly and verified functionality
[ ] I have considered impact on existing systems and users
```

Nothing stops MR author from merging with a box unticked. After the merge, the platform runs a code assessment and records the result, and one empty box is enough to mark the author as a non-compliant engineer.

## The bot that wants proof

The second checker is newer and stricter. It is a GitLab pipeline job, and it is deterministic: the same MR gets the same result every time. The job opens a bot thread in the MR, and MR author have to fill in the thread before the MR can merge. It asks for test evidence, meaning proof that the author tested the change, and for the impact the MR will have on other systems and on users.

Ticking a box takes one click. Filling in the thread takes a few minutes, and the answers stay in the MR. Months later, anyone can open the MR and see who shipped the change, what it was for, and how that person checked that it worked. The checker exists for this audit trail.

## Why companies are adding these checks now

AI writes a large part of the code we ship, and most teams cannot say which part. Several reports from this year show how big the problem is.

Sonar asked more than 1,100 developers for its [2026 State of Code report](https://www.sonarsource.com/blog/state-of-code-developer-survey-report-the-current-reality-of-ai-coding/). They said AI writes or assists 42% of the code they commit. 96% of them do not fully trust that code, and only 48% always check it before they commit.

In March 2026, the Financial Times reported on a mandatory Amazon meeting about a "trend of incidents" with a "high blast radius". An internal briefing linked the incidents to "Gen-AI assisted changes". According to the report, junior and mid-level engineers would need a senior engineer to sign off on AI-assisted changes. [Amazon disputed parts of the story](https://fortune.com/2026/03/11/elon-musk-amazon-outage-ai-relate-incident-meeting-report-cybersecurity): it said only one incident involved AI, none involved AI-written code, and there is no such sign-off rule. Even so, I could easily imagine the same meeting at my own company.

In June 2026, GitLab published its [AI Accountability Report](https://about.gitlab.com/press/releases/2026-06-23-gitlab-research-reveals-organizations-are-generating-ai-code-faster-than-they-can-control-it/), based on 1,528 respondents. 80% said their organization adopted AI tools faster than it wrote policies for them, and 43% cannot reliably tell AI-generated code from human-written code in their own codebase.

On 23 September, Qodo released its [2026 State of AI Code Quality report](https://www.globenewswire.com/news-release/2026/09/23/3367496/0/en/qodo-s-2026-state-of-ai-code-quality-report-reveals-growing-verification-challenge-as-agentic-development-scales.html). 90% of engineering leaders feel confident when they report AI's impact to executives, but only 45% have evidence that traces AI activity to the code changes it made.

Regulation is moving the same way. Since 11 September 2026, the [EU Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) has required manufacturers to report actively exploited vulnerabilities in their products, with an early warning due within 24 hours. That is not much time to find out who approved a change.

GitLab's report asks three questions about any change: where did it come from, what was it meant to do, and who is responsible for it once it is in production? My company's two checks cover all three. The MR records where the change came from, the impact field says what it was meant to do, and the ticked checklist names the person responsible.

## What I take from it

Most of what the checks ask for is work I should do anyway. It helps to write the impact first: if the impact does not fit in two sentences, the MR is probably too big. It also helps to save test evidence while testing, because repeating a test run after review takes longer. And the AI's diff deserves the same care as a diff from a stranger.

## What a checkbox cannot do

A checkbox proves nothing on its own. An engineer can tick all three boxes without reading a line of the diff, and the bot thread will accept a screenshot of the wrong test. The checks cannot make code correct, but they do put one person's name on each change.

After the next incident, the first question will be who merged the change and what they knew when they did. With these checks, the MR already holds the answer: name, test evidence, and note on the impact.
