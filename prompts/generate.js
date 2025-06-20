export const get_generate_prompt = (
  topics,
  get_old_question,
  numberOfQuestions
) => {
  const seed = Math.floor(Math.random() * 10000);
  const timestamp = new Date().toISOString();
  const prompt = `\nID de generación: ${timestamp}`;

  if (get_old_question.length > 0) {
    return `
    Eres un profesor experto en matemáticas que ayuda a estudiantes a prepararse para el examen de ingreso a la universidad.
    
    Crea ${numberOfQuestions} preguntas de matemáticas basadas en los siguientes subtemas:
    
    ${topics}
    
    Reglas:
    - Las preguntas deben estar en español.
    - Cada pregunta debe ser autocontenida y tener una dificultad variada (fácil, media, difícil).
    - - Si la pregunta es de geometría, especifica claramente la información necesaria (como base y altura) o indica el tipo de triángulo.
    - Si hay cálculos, verifica que el resultado sea correcto.
    - Usa este formato JSON:
    
    [
      {
        "question": "Aquí va la pregunta.",
        "options": ["A", "B", "C", "D"],
        "correctAnswerIndex": "Aqui el indice de la opción correcta (0, 1, 2 o 3)",
       },
      ...
    ]
    
    Responde **solo con el array JSON**, sin comentarios ni texto adicional.
    por favor genera preguntas diferentes  a esto :
    ${get_old_question}
    ID de generación: ${seed}
    ${prompt}
    `;
  } else {
    return `
    Eres un profesor experto en matemáticas que ayuda a estudiantes a prepararse para el examen de ingreso a la universidad.
    
    Crea ${numberOfQuestions} preguntas de matemáticas basadas en los siguientes subtemas:
    
    ${topics}
    
    Reglas:
    - Las preguntas deben estar en español.
    - Cada pregunta debe ser autocontenida y tener una dificultad variada (fácil, media, difícil).
    - - Si la pregunta es de geometría, especifica claramente la información necesaria (como base y altura) o indica el tipo de triángulo.
    - Si hay cálculos, verifica que el resultado sea correcto.
    - Usa este formato JSON:
    
    [
      {
        "question": "Aquí va la pregunta.",
        "options": ["A", "B", "C", "D"],
        "correctAnswerIndex": "Aqui el indice de la opción correcta (0, 1, 2 o 3)",
       },
      ...
    ]
    
    Responde **solo con el array JSON**, sin comentarios ni texto adicional.
    ID de generación: ${seed}
    ${prompt}
    `;
  }
};

export const get_generate_prompt_lecture = (
  topics,
  get_old_question,
  numberOfQuestions
) => {
  const seed = Math.floor(Math.random() * 10000);
  const timestamp = new Date().toISOString();
  const prompt = `\nID de generación: ${timestamp}`;

  if (get_old_question.length > 0) {
    return `Eres un profesor experto en comprensión lectora que ayuda a estudiantes a prepararse para el examen de ingreso a la universidad.

Crea ${numberOfQuestions} preguntas de **comprensión lectora** basadas en los siguientes subtemas:

${topics}

Reglas:
- Cada pregunta debe estar basada en un fragmento breve de texto (narrativo, expositivo, descriptivo o argumentativo), de máximo 80 palabras.
- Incluye el texto como un campo llamado "text" en el JSON.
- Las preguntas deben evaluar habilidades de lectura como: inferencias, idea principal, vocabulario en contexto, propósito del autor, secuencia de eventos, opinión vs hecho, etc.
- NO incluyas cálculos matemáticos, fórmulas ni problemas numéricos.
- Las preguntas deben tener una dificultad balanceada: fácil, media y difícil.
- Formato de respuesta: un array JSON con esta estructura:

[
  {
    "text": "Texto breve aquí...",
    "question": "¿Pregunta basada en el texto anterior?",
    "options": ["A", "B", "C", "D"],
    "correctAnswerIndex": 2
  },
  ...
]

Responde solo con el array JSON, sin explicaciones ni comentarios.

ID de generación: ${seed}
    ${prompt}
    `;
  } else {
    return `
  Eres un profesor experto en comprensión lectora que ayuda a estudiantes a prepararse para el examen de ingreso a la universidad.

Crea ${numberOfQuestions} preguntas de **comprensión lectora** basadas en los siguientes subtemas:

${topics}

Reglas:
- Cada pregunta debe estar basada en un fragmento breve de texto (narrativo, expositivo, descriptivo o argumentativo), de máximo 80 palabras.
- Incluye el texto como un campo llamado "text" en el JSON.
- Las preguntas deben evaluar habilidades de lectura como: inferencias, idea principal, vocabulario en contexto, propósito del autor, secuencia de eventos, opinión vs hecho, etc.
- NO incluyas cálculos matemáticos, fórmulas ni problemas numéricos.
- Las preguntas deben tener una dificultad balanceada: fácil, media y difícil.
- Formato de respuesta: un array JSON con esta estructura:

[
  {
    "text": "Texto breve aquí...",
    "question": "¿Pregunta basada en el texto anterior?",
    "options": ["A", "B", "C", "D"],
    "correctAnswerIndex": 2
  },
  ...
]

Responde solo con el array JSON, sin explicaciones ni comentarios.

ID de generación: ${seed}
    ${prompt}
    `;
  }
};

/*

 return `final prompt = 
You're an expert math teacher helping students prepare for a college entrance exam. 
Generate 5 math questions based on the following subtopics:

${topics}

Guidelines:
- The total set should represent a balanced difficulty (easy, medium, hard).
- Each question must be self-contained and understandable.
- Format the result as a JSON array with this structure:
[
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "A brief explanation of the answer."
  },
  ...
]

Keep it in Spanish, as students will take the exam in Spanish.
Only respond with the JSON array.

`;
*/
