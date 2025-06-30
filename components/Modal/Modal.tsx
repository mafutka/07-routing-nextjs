'use client'
import css from './Modal.module.css'
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useCallback } from "react"

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
   const router = useRouter();

 const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

   useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => removeEventListener('keydown', onEsc);
   }, [handleClose]);

   return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

    </div>
   )
}

export default Modal;

// Реалізуйте компонент NotePreview для попереднього перегляду однієї нотатки 
// у модальному вікні Modal, використовуючи перехоплення маршрутів.

// Щоб уникнути дублювання логіки модальних вікон, 
// виконайте рефакторинг наявного компонента NoteModal: 
// перейменуйте його на Modal, додайте пропс children 
// і зробіть його універсальним, щоб він міг використовуватись 
// для будь-якого вмісту — не лише для NoteForm, а і для NotePreview.

// При переході на маршрут типу /notes/123 має відкриватися модальне вікно 
// з деталями обраної нотатки. 
// Основна сторінка зі списком нотаток при цьому має залишатися на фоні 
// та не перезавантажуватись.

// Реалізуйте закриття модального вікна як повернення на маршрут сторінки,
//  з якої відкривалось модальне вікно 
// (наприклад, /notes/filter/Work, /note/filter/All тощо).

