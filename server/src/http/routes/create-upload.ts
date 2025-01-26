

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    // Registra os dados do upload
    const fileData = {
      originalName: req.file.originalname,
      uploadPath: req.file.path,
      size: req.file.size,
      uploadDate: new Date(),
    };

    console.log("Arquivo enviado:", fileData);

    // Retorna a URL pública do arquivo
    const fileUrl = `http://localhost:3334/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error("Erro ao processar o upload:", error);
    res.status(500).json({ error: "Erro ao fazer upload do arquivo" });
  }
});
