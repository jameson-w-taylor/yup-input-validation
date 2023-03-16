import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonPage } from '@ionic/react';
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
    formState: { errors, isValid, touchedFields, dirtyFields },
  } = useForm<PageInputs>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema)
  });

  const getInputClassNames = (field: keyof PageInputs) => {
    return [
      errors[field] ? 'ion-invalid' : 'ion-valid',
      touchedFields[field] ? 'ion-touched' : 'ion-untouched',
      dirtyFields[field] ? 'ion-dirty' : 'ion-pristine'
    ].join(' ');
  }

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader className="ion-text-center">
            <IonCardTitle>Form Test</IonCardTitle>
            <IonCardSubtitle>Welcome to some validation testing</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  type="email"
                  label="E-mail Address"
                  labelPlacement="floating"
                  value={value}
                  onIonBlur={onBlur}
                  onIonInput={(e) => onChange(e.detail.value)}
                  className={getInputClassNames('email')}
                  errorText={errors.email?.message}
                ></IonInput>
              )}/>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  type="password"
                  label="Password"
                  labelPlacement="floating"
                  value={value}
                  onIonBlur={onBlur}
                  onIonInput={(e) => onChange(e.detail.value)}
                  className={getInputClassNames('password')}
                  errorText={errors.password?.message}
                ></IonInput>
              )}/>
            <IonButton
              data-testid="basic-signin-button"
              expand="block"
              disabled={!isValid}
              onClick={handleSubmit((formData) => console.log(formData))}>
              Sign In With Email
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;