import AppAppBar from "@/components/AppBar";
import { brand } from "@/theme/themePrimitives";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import { addDoc, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { db } from "../../../firebase-config";

export default function Settings() {
  // const MPTheme = createTheme(getMPTheme());
  const [phone, setPhone] = useState("");
  async function handleSubmitPhone() {
    try {
      const user = JSON.parse(localStorage.getItem("@user_adot-me") ?? "{}");
      if (user) {
        const q = query(
          collection(db, "data-user"),
          where("user", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.size) {
          const docRef = await addDoc(collection(db, "data-user"), {
            phone: phone,
            user: user.uid,
          });
          console.log("Documento adicionado com ID: ", docRef.id);
        } else {
          querySnapshot.forEach(async (document) => {
            const usuarioRef = doc(db, "data-user", document.id);
            await updateDoc(usuarioRef, {
              phone: phone,
            });
            console.log("Documento atualizado");
          });

        }
      }
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }
  async function fetchUserPhone() {
    const user = JSON.parse(localStorage.getItem("@user_adot-me") ?? "{}");
    if(user){

      const q = query(collection(db, "data-user"), where("user", "==", user.uid));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPhone(doc.data().phone);
      });
    }
  }
  useEffect(() => {
    fetchUserPhone();
  }, []);
  return (
    // <ThemeProvider theme={MPTheme}>

    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AppAppBar />
      <Box mt={16} width={"50%"}>
        <Box
          p={4}
          borderRadius={2}
          bgcolor={"rgba(5, 7, 10, 0.31)"}
          alignItems={"center"}
          display="flex"
          gap={2}
        >
          <FormLabel>Telefone:</FormLabel>
          <InputMask
            mask="(99) 99999-9999"
            value={phone}
            disabled={false}
            onChange={(e) => setPhone(e.target.value)}
            maskChar=" "
          >
            {() => <TextField variant="outlined" />}
          </InputMask>
        </Box>
        <Box display={"flex"} justifyContent={"end"} mt={1}>
          <Button
            variant="outlined"
            onClick={handleSubmitPhone}
            sx={{
              backgroundColor: brand[700],
              "&:hover": {
                backgroundColor: brand[800],
              },
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
    // </ThemeProvider>
  );
}
