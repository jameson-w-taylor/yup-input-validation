import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type PageInputs = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup.string().required().email().label('Email Address'),
  password: yup.string().required().label('Password')
});

const Home: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
  } = useForm<PageInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const getInputClassNames = (field: keyof PageInputs) => {
    const classNames = [];
    if (errors[field]) {
      classNames.push('ion-invalid');
    } else {
      classNames.push('ion-valid');
    }
    if (touchedFields[field]) {
      classNames.push('ion-touched');
    }
    return classNames.join(' ');
  }

  return (
    <IonPage>
      <IonContent className="ion-text-center">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Form Test</IonCardTitle>
            <IonCardSubtitle>Welcome to some validation testing</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    type="email"
                    label="E-mail Address"
                    labelPlacement="floating"
                    value={value}
                    onIonInput={(e) => onChange(e.detail.value)}
                    className={getInputClassNames('email')}
                    errorText={errors.email?.message}
                  ></IonInput>
                )}/>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    type="password"
                    label="Password"
                    labelPlacement="floating"
                    value={value}
                    onIonInput={(e) => onChange(e.detail.value)}
                    className={getInputClassNames('password')}
                    errorText={errors.password?.message}
                  ></IonInput>
                )}/>
              <IonItem>
                <IonLabel>
                  <IonButton
                    data-testid="basic-signin-button"
                    expand="block"
                    disabled={!isValid}
                    onClick={handleSubmit((formData) => console.log(formData))}>
                    Sign In With Email
                  </IonButton>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;