import {useAppSelector} from "../../hooks/useAppSelector"
import {IPopup} from "../../types/popup"
import {MouseEvent} from "react"
import {FC, memo} from 'react'
import {useActions} from "../../hooks/useActions"
import './style.scss'

const Popup: FC<IPopup> = memo(({title, name, render}) => {
	const popup = useAppSelector(state => state.popup[name].type)
	const {closePopup} = useActions()

	if (popup) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = ''
	}

	return (
		<div className={`popup ${name} ${popup ? 'show' : 'hide'}`}>
			<div onClick={(e: MouseEvent<HTMLDivElement>) => {
				if ((e.target as Element).classList.contains('popup__container')) {
					closePopup({name})
				}
			}} className={`popup__container ${name}`}>
				<div className={`popup__content ${name}`}>
					{title && (
						<div className="popup__control-panel">
							<div className="popup__control-panel__title">{title}</div>
							<div onClick={() => closePopup({name})} className="popup__control-panel__close">&#x2715;</div>
						</div>
					)}
					<div className={`popup__main ${name}`}>
						{render()}
					</div>
				</div>
			</div>
		</div>
	)
})

export default Popup