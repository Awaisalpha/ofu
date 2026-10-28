import { useRef, useState } from 'react'
import { dateFromToday } from '../../utils/dates'
import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  validateDeadline,
  validateDescription,
  validateRequired,
  validateTitle,
} from '../../utils/validation'
import Button from '../ui/Button'
import CharacterCount from '../ui/CharacterCount'
import FieldError from '../ui/FieldError'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import OpportunityPreview from './OpportunityPreview'
import TypeRadioGroup from './TypeRadioGroup'

// Listed in form order, so on submit the first invalid field is the first one here.
const validators = {
  title: validateTitle,
  type: (value) => validateRequired(value, 'Choose a type.'),
  organisation: (value) => validateRequired(value, 'Enter the organisation name.'),
  location: (value) => validateRequired(value, 'Enter a location, or tick Remote.'),
  deadline: validateDeadline,
  description: validateDescription,
}

// Joins the ids of the hint, counter and error a field points at, skipping empty ones.
function describedBy(...ids) {
  return ids.filter(Boolean).join(' ') || undefined
}

// Same rules as ApplyForm: errors appear when a field is left, and update on every
// keystroke once shown, so they disappear as soon as the value is fixed.
export default function PostOpportunityForm({ defaultOrganisation, onSubmit }) {
  const emptyValues = {
    title: '',
    type: '',
    organisation: defaultOrganisation,
    location: '',
    deadline: '',
    stipend: '',
    description: '',
  }
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  // The typed location is kept while Remote is ticked, so unticking brings it back.
  const [isRemote, setIsRemote] = useState(false)
  const fieldRefs = useRef({})

  const currentValues = { ...values, location: isRemote ? 'Remote' : values.location }

  function setError(field, message) {
    setErrors((currentErrors) => ({ ...currentErrors, [field]: message }))
  }

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setError(field, validators[field](value))
  }

  function validateField(field) {
    setError(field, validators[field](currentValues[field]))
  }

  function toggleRemote(event) {
    setIsRemote(event.target.checked)
    setError('location', '')
  }

  function clearForm() {
    setValues(emptyValues)
    setErrors({})
    setIsRemote(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = {}
    for (const field of Object.keys(validators)) {
      newErrors[field] = validators[field](currentValues[field])
    }
    setErrors(newErrors)

    const firstInvalidField = Object.keys(validators).find((field) => newErrors[field])
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField].focus()
      return
    }

    onSubmit({
      title: currentValues.title.trim(),
      type: currentValues.type,
      organisation: currentValues.organisation.trim(),
      location: currentValues.location.trim(),
      deadline: currentValues.deadline,
      stipend: currentValues.stipend.trim(),
      description: currentValues.description.trim(),
    })
    clearForm()
  }

  // Placeholders keep the card's shape while fields are still empty.
  const previewOpportunity = {
    title: currentValues.title.trim() || 'Your opportunity title',
    type: currentValues.type || 'Type',
    organisation: currentValues.organisation.trim() || 'Organisation',
    location: currentValues.location.trim() || 'Location',
    stipend: currentValues.stipend.trim(),
    deadline: currentValues.deadline,
    postedAt: dateFromToday(0),
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-card border border-line bg-surface p-5 sm:p-6">
        <div>
          <label htmlFor="post-title" className="text-sm font-semibold">
            Title
          </label>
          <Input
            ref={(element) => {
              fieldRefs.current.title = element
            }}
            id="post-title"
            name="title"
            required
            autoComplete="off"
            placeholder="e.g. Junior Frontend Developer"
            value={values.title}
            onChange={(event) => updateField('title', event.target.value)}
            onBlur={() => validateField('title')}
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={describedBy('post-title-count', errors.title && 'post-title-error')}
            className="mt-2 px-3"
          />
          <div className="flex items-start justify-between gap-3">
            <FieldError id="post-title-error">{errors.title}</FieldError>
            <CharacterCount id="post-title-count" length={values.title.trim().length} maxLength={TITLE_MAX_LENGTH} />
          </div>
        </div>

        <TypeRadioGroup
          value={values.type}
          error={errors.type}
          onChange={(type) => updateField('type', type)}
          onBlur={() => validateField('type')}
          firstRadioRef={(element) => {
            fieldRefs.current.type = element
          }}
        />

        <div>
          <label htmlFor="post-organisation" className="text-sm font-semibold">
            Organisation
          </label>
          <Input
            ref={(element) => {
              fieldRefs.current.organisation = element
            }}
            id="post-organisation"
            name="organisation"
            required
            autoComplete="organization"
            value={values.organisation}
            onChange={(event) => updateField('organisation', event.target.value)}
            onBlur={() => validateField('organisation')}
            aria-invalid={errors.organisation ? true : undefined}
            aria-describedby={describedBy(errors.organisation && 'post-organisation-error')}
            className="mt-2 px-3"
          />
          <FieldError id="post-organisation-error">{errors.organisation}</FieldError>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="post-location" className="text-sm font-semibold">
              Location
            </label>
            <Input
              ref={(element) => {
                fieldRefs.current.location = element
              }}
              id="post-location"
              name="location"
              required
              placeholder="e.g. Gulberg, Lahore"
              value={currentValues.location}
              disabled={isRemote}
              onChange={(event) => updateField('location', event.target.value)}
              onBlur={() => validateField('location')}
              aria-invalid={errors.location ? true : undefined}
              aria-describedby={describedBy(errors.location && 'post-location-error')}
              className="mt-2 px-3 disabled:bg-canvas disabled:text-muted"
            />
            <FieldError id="post-location-error">{errors.location}</FieldError>
            <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isRemote"
                checked={isRemote}
                onChange={toggleRemote}
                className="size-4 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              Remote
            </label>
          </div>

          <div>
            <label htmlFor="post-deadline" className="text-sm font-semibold">
              Deadline
            </label>
            <Input
              ref={(element) => {
                fieldRefs.current.deadline = element
              }}
              id="post-deadline"
              name="deadline"
              type="date"
              required
              min={dateFromToday(1)}
              value={values.deadline}
              onChange={(event) => updateField('deadline', event.target.value)}
              onBlur={() => validateField('deadline')}
              aria-invalid={errors.deadline ? true : undefined}
              aria-describedby={describedBy(errors.deadline && 'post-deadline-error')}
              className="mt-2 px-3"
            />
            <FieldError id="post-deadline-error">{errors.deadline}</FieldError>
          </div>
        </div>

        <div>
          <label htmlFor="post-stipend" className="text-sm font-semibold">
            Stipend or reward <span className="font-normal text-muted">(optional)</span>
          </label>
          <Input
            id="post-stipend"
            name="stipend"
            autoComplete="off"
            placeholder="e.g. PKR 30,000 / month"
            value={values.stipend}
            onChange={(event) => updateField('stipend', event.target.value)}
            className="mt-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="post-description" className="text-sm font-semibold">
            Description
          </label>
          <p id="post-description-hint" className="mt-0.5 text-[13px] text-muted">
            What the role involves, who can apply and how, in {DESCRIPTION_MIN_LENGTH}–{DESCRIPTION_MAX_LENGTH}{' '}
            characters.
          </p>
          <Textarea
            ref={(element) => {
              fieldRefs.current.description = element
            }}
            id="post-description"
            name="description"
            rows={7}
            required
            value={values.description}
            onChange={(event) => updateField('description', event.target.value)}
            onBlur={() => validateField('description')}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={describedBy(
              'post-description-hint',
              'post-description-count',
              errors.description && 'post-description-error',
            )}
            className="mt-2 resize-y"
          />
          <div className="flex items-start justify-between gap-3">
            <FieldError id="post-description-error">{errors.description}</FieldError>
            <CharacterCount
              id="post-description-count"
              length={values.description.trim().length}
              maxLength={DESCRIPTION_MAX_LENGTH}
            />
          </div>
        </div>

        {/* On phones Submit sits on top, closest to the thumb. */}
        <div className="flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={clearForm}>
            Clear form
          </Button>
          <Button type="submit">Submit for review</Button>
        </div>
      </form>

      <div className="lg:sticky lg:top-6">
        <OpportunityPreview opportunity={previewOpportunity} />
      </div>
    </div>
  )
}
