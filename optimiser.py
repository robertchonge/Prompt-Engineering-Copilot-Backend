def optimize_prompt(raw_prompt: str):
    # Basic optimization rules (expand as needed)
    suggestions = []
    explanations = []

    if len(raw_prompt) > 300:
        suggestions.append("Shorten your prompt to focus on one task.")
        explanations.append("Large prompts waste tokens and confuse LLMs.")

    if not any(k in raw_prompt.lower() for k in ["act as", "you are"]):
        suggestions.append("Define AI role using phrases like 'Act as...' or 'You are...'")
        explanations.append("Explicit instructions help the LLM behave predictably.")

    suggestions.append("Structure using Instruction > Context > Example > Output Style.")
    explanations.append("Structured prompts guide LLMs for higher-quality responses.")

    return suggestions, explanations

