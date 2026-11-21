---
slug: accept-all-is-making-me-a-worse-engineer
title: '"Accept All" is making me a worse engineer'
summary: Coding agents made me faster at shipping and slower at thinking. Six signs that I am losing my edge, the research that explains them, and the rules I now follow to win it back.
publishedAt: 2026-11-20
previewSrc: /previews/accept-all-is-making-me-a-worse-engineer.svg
previewAlt: A large Accept all button under a mouse cursor, beside three bars, docs I read, diffs I read, and ideas of my own, that drain toward empty
---

I think I am getting worse as an engineer. I ship more than ever, so the output looks fine. The decline shows in smaller places: what I read, what I remember, and how long I can stay with one problem. I suspect everyone who works with agents feels some of this, even if few people say it out loud.

In February 2025, Andrej Karpathy [described vibe coding](https://simonwillison.net/2025/Feb/6/andrej-karpathy/) like this: "I 'Accept All' always, I don't read the diffs anymore." He meant throwaway weekend projects. I now do it on real work, and this is what my sessions look like:

![An agent session in a terminal. I ask it to refactor the checkout flow. It reads 23 files, edits 14, and asks to apply all changes. The Accept all choice is highlighted, and I type: ok, use it.](/images/posts/accept-all-is-making-me-a-worse-engineer/accept-all.svg)

Here are the six signs, from the first one I noticed to the one that scares me most.

## 1. I stopped reading the changelog

I no longer follow languages, libraries, or new patterns. A React release, a PyTorch update, or the next ECMAScript spec gets nothing from me. I cannot make myself skim the docs for five minutes, because the agent "knows" them.

It is like taking a taxi everywhere. You reach every address and never learn the city. On the day no taxi comes, you stand on a corner with no map in your head.

Lisanne Bainbridge named this trap in 1983, in [Ironies of Automation](https://en.wikipedia.org/wiki/Ironies_of_Automation). Automate the routine work, and the operator loses the practice that keeps the skill alive. Then the machine hands back control at the worst moment, when something has gone wrong, to the person least ready to take it. Addy Osmani calls the same effect [skill atrophy](https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age): stop practicing a skill, and you slowly lose it.

## 2. "Ok, use it"

The context I keep in my head has shrunk to almost nothing. When I researched a topic with Google, I collected side findings on the way: a blog post about a bug I had not met yet, an RFC, a better library hidden in a forum reply. Those detours made me broader. Now the agent sends a plan, and I answer "ok, use it" without reading it.

![Two routes from a question to an answer. With search, the route winds past a blog post, an RFC, a forum reply, and a better library. With an agent, the route is a straight line and I pick up nothing on the way.](/images/posts/accept-all-is-making-me-a-worse-engineer/detour.svg)

The research matches the feeling. In a January 2026 [randomized trial by Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills), 52 engineers learned a new Python library. The group with AI scored about 50% on a quiz afterwards; the group that coded by hand scored 67%. The AI group was not faster, and the widest gap was in debugging. People who handed the whole task to the AI scored lowest. People who asked it follow-up questions scored best.

An MIT Media Lab study, [Your Brain on ChatGPT](https://www.media.mit.edu/publications/your-brain-on-chatgpt/), measured the weakest brain connectivity in its LLM group, and many of those participants could not quote the essays they had just "written". The authors call it cognitive debt. A [Microsoft and Carnegie Mellon survey](https://www.theregister.com/2025/02/11/microsoft_study_ai_critical_thinking/) of 319 knowledge workers found the same pattern: the more people trust the AI, the less critical thinking they do. These studies are small, but they describe my week.

## 3. Five minutes of waiting, thirty minutes gone

I spend most of my day waiting. I prefer that to fake hyperproductivity: ten agents in parallel, millions of tokens burned, and work that gets worse. I believe in the linear approach of one task, one agent, and one review.

Waiting has a price, though. A five-minute run becomes thirty minutes. I open Slack, then X, then another repo. When the agent finishes, I no longer remember why I asked for it. It is a microwave dinner: you press start, leave the kitchen, and find the food cold an hour later.

![A 30-minute timeline. The plan is a 5-minute agent run and then a review. In reality the agent finishes at minute 5 while I am in Slack, X, another repo, and email, and at minute 30 I ask myself what I was doing.](/images/posts/accept-all-is-making-me-a-worse-engineer/wait.svg)

Gloria Mark, who studies attention at UC Irvine, [found](https://www.universityofcalifornia.edu/news/how-sharpen-your-attention-and-meet-your-goals-2024) that people now stay on one screen for 47 seconds on average before they switch. In 2003 it was two and a half minutes. Every agent run gives my brain a free pass to switch.

The feeling of speed also lies. In a [2025 METR trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), experienced open-source developers took 19% longer with AI tools. Afterwards, they believed AI had made them 20% faster.

## 4. Agents live in my head now

My anxiety has gone up. I wake up thinking about agents. I eat, walk, and talk to people while I think about agents. When I do not use them, I plan my next session with them.

I am not alone. Armin Ronacher, the creator of Flask, calls it [agent psychosis](https://lucumr.pocoo.org/2026/1/18/agent-psychosis/) and describes months of short sleep and endless prompts. Marketplace reported on ["token anxiety"](https://www.marketplace.org/episode/2026/05/11/ai-agents-are-10xing-productivity), the fear that your agents sit idle while you are away. [Axios](https://www.axios.com/2026/04/04/ai-agents-burnout-addiction-claude-code-openclaw) wrote that agents trigger "something that looks a lot like addiction" in some of tech's highest performers.

The pull has a familiar shape. Each prompt is a pull on a [slot machine](https://dev.to/desty2k/your-coding-agent-is-a-slot-machine-1a2h): sometimes a perfect diff, sometimes garbage, often almost right. Random rewards keep you pulling.

![A slot machine labeled one more prompt. Its reels spin through pass, fail, and almost, its lever pulls again and again, and a bar of tokens spent keeps filling.](/images/posts/accept-all-is-making-me-a-worse-engineer/slot-machine.svg)

## 5. If an agent cannot do it, I skip it

I have become hyper-lazy. When an agent cannot solve a task, I try not to do the task at all.

After a month of escalators, two flights of stairs feel like a mountain. The stairs stay the same; your legs change. Every task I skip makes the next manual task heavier, so I skip that one too.

## 6. My creativity went flat

Creativity was always my strength. I am not the strongest engineer, but I could always find an interesting solution. Those ideas came while I worked: I hit a problem, took in new information, and my brain stayed in flow. Now I feel dull and one-dimensional. I can no longer turn a problem around and look at it from a new side.

Creativity is a campfire. It needs friction to start and fuel to keep burning, and the agent removes both.

A [2024 study in Science Advances](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532) by Anil Doshi and Oliver Hauser shows the cost at scale. Writers who got story ideas from an AI wrote better stories, but those stories were more alike. Each writer won; the group lost range.

![Two groups of twelve story ideas drawn as dots. Writers alone spread their ideas wide. Writers with AI ideas start just as wide, then slide together into one tight cluster.](/images/posts/accept-all-is-making-me-a-worse-engineer/converge.svg)

## The bubble

My biggest worry is larger than me. AI does not solve every problem or cure every disease. It is a tool that acts like an agent in its own right, and in its current architecture it cannot go past the edge of what it has seen. A human can.

Researchers already know what happens when models feed on their own output. In [Nature in 2024](https://www.nature.com/articles/s41586-024-07566-y), Ilia Shumailov and colleagues showed that models trained on generated data lose the rare tails of the original data. They call it model collapse. By the ninth generation, a text about medieval architecture had turned into a list of jackrabbits.

People can collapse the same way. If engineers stop walking outside what the model knows, progress slows down and stays inside a bubble the size of what AI can do.

![A dashed bubble labeled what the model has seen, full of grey dots that drift but never leave it. One red dot, a human, walks out through the edge and becomes a new idea.](/images/posts/accept-all-is-making-me-a-worse-engineer/bubble.svg)

## What agents still give me

I am not quitting. Agents give me real things:

- **Speed on the boring parts:** setup, migrations, and test scaffolds take minutes.
- **Courage:** I start side projects that I would never start alone.
- **Answers about my own code:** when I ask why something works, the agent explains it with the files in my repo, not with a generic example.

The tool works. My habit of handing it my thinking is the problem.

## My rules to win it back

1. **Think first, prompt second.** I write my own plan in three lines before the agent writes its plan.
2. **Read high-level decisions and diffs.** First I check the decisions in the agent's plan, then I read the diff. Accept All is for throwaway code only.
3. **Ask why.** In the Anthropic trial, the people who asked follow-up questions kept their skills. I ask the agent to explain one decision in each change.
4. **Stay with the run.** During a wait, I review the last diff or sketch the next step. Slack and X can wait too.
5. **One manual hour a day.** I fix one bug or read one changelog with no agent.
6. **Walk without agents.** On a walk, I think about the problem itself, not about the prompts for my next session.

Each rule costs a few minutes. In return, I keep the map, the attention, and the detours that made me good at this job. An agent can take me anywhere the model has already been. Only I can go somewhere new, and only if I keep my legs strong enough to walk there.
