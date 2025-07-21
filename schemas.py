from pydantic import BaseModel
from typing import List

class PromptInput(BaseModel):
    prompt: str

class OptimizedPromptOutput(BaseModel):
    original_prompt: str
    suggestions: List[str]
    explanations: List[str]
    token_estimate: int
