# 1. prepare dataset
# 2. load pretrained Tokenizer, call it with dataset -> encoding
# 3. build PyTorch Dataset with encodings
# 4. Load pretrained Model
# 5. a) Load Trainer and train int
#    b) native PyTorch training look

from transformers import Trainer, TrainingArguments

training_args = TrainingArguments("test-trainer")

trainer = Trainer(
  model,
  training_args,
  train_dataset=tokenized datasets["train"],
  eval_dataset=tokenized datasets["validation"],
  data_collator=data_collator,
  tokenizer=tokenizer,
)
trainer.train()