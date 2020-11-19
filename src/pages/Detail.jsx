import React, { useState } from "react";
import {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonCardContent,
    IonActionSheet,
    IonAlert
} from "@ionic/react";
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import { star, trash, close, create } from "ionicons/icons";
import { useHistory } from "react-router-dom"

const Detail = (props) => {
    const name = props.match.params.name.substr(1)
    const data = JSON.parse(localStorage.companyData)
    const [showAction, setShowAction] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    let history = useHistory()
    if(data[name] === undefined){
        data[name] = {}
    }
    return (
        <IonPage>
            <Header name={"企業情報"} click={setShowAction} flag={true} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle  class="ion-text-center">{name}</IonCardTitle>
                    </IonCardHeader>
                    {Object.entries(data[name]).map(value => {
                    return (
                        <IonCard key={value}>
                            <IonCardHeader>
                                <IonCardTitle>{value[0] + " "}
                                    <IonIcon icon={star} color = "warning">aiuro</IonIcon>
                                    {" " + value[1][1]}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {value[1][0]}
                            </IonCardContent>
                        </IonCard>
                    )
                })}
                </IonCard>
                <IonActionSheet
                    isOpen={showAction}
                    onDidDismiss={() => setShowAction(false)}
                    header="変更・削除"
                    buttons={[{
                        text: "削除",
                        role: "destructive",
                        icon: trash,
                        handler: () => {
                            setShowAlert(true)
                        }
                    }, {
                        text: "変更",
                        icon: create,
                        handler: () => {
                            history.push("/edit/:" + name)
                        }
                    }, {
                        text: "閉じる",
                        role: "cancel",
                        icon: close
                    }]}
                />
                <IonAlert 
                isOpen = {showAlert}
                onDidDismiss = {() => setShowAlert(false)}
                header = "削除してよろしいですか？"
                buttons = {[{
                    text:"閉じる",
                }, {
                    text: "削除",
                    handler:(() => {
                        delete data[name]
                        localStorage.companyData = JSON.stringify(data)
                        history.push("/tab1")

                    })
                }]}
                />
            </IonContent>
            <Footer />
        </IonPage>
    );
}
export default Detail;