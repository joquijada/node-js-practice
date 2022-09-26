console.log("filter=((age = 60 - 65 OR age = 54 - 59) AND (sex = Male) AND (region = Orbital Frontal Cortex OR region = Amygdala))"
  .replace(/(\w+)\s=\s(\d+)\s-\s(\d+)/g, '$1 BETWEEN $2 and $3'))
