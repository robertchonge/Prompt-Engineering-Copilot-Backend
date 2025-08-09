from fastapi import APIRouter, HTTPException
from app.schemas import PromptInput, OptimizedPromptOutput
from app.optimizer import optimize_prompt
from app.llm_utils import estimate_tokens

router = APIRouter()

@router.post("/analyze-prompt", response_model=OptimizedPromptOutput)
def analyze_prompt(payload: PromptInput):
    if not payload.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    suggestions, explanations = optimize_prompt(payload.prompt)
    token_estimate = estimate_tokens(payload.prompt)

    return OptimizedPromptOutput(
        original_prompt=payload.prompt,
        suggestions=suggestions,
        explanations=explanations,
        token_estimate=token_estimate
    )
