# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# portal
- Portal cards should display four fields: Nama Portal, Kode Portal, URL Portal, and Icon. Confidence: 0.65
- Use dark-only theme — no light mode, no theme toggle. Confidence: 0.70

# ui
- Login form input icons should use vibrant/visible colors (e.g., primary), not muted/neutral tones. Confidence: 0.65
- Apply Tailwind text color classes on the parent `<span>` wrapper, not directly on `<Icon>` — Iconify SVGs don't inherit opacity-modifier classes properly. Confidence: 0.70

# debugging
- When user reports an error with a specific error message/response, focus on fixing that exact error first before doing broad speculative analysis of other potential issues. Confidence: 0.65
