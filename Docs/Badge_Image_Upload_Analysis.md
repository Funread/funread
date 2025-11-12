# Análisis: Implementación de Subida de Imágenes para Badges

## Resumen del Análisis

He analizado cómo se manejan las imágenes en diferentes partes de la aplicación Funread para aplicar la misma lógica al sistema de badges.

## 🔍 Patrones Encontrados en la Aplicación

### 1. **API de Media (`/api/media.js`)**
La aplicación usa una API centralizada para el manejo de medios:

```javascript
export async function save_Image(file, galleryType) {
  const formFile = new FormData();
  formFile.append('file', file);
  if (galleryType !== undefined) {
    formFile.append('galleryType', galleryType);
  }
  return axiosAuth().post('Media/save/', formFile);
}

export async function upload(name) {
  return axiosAuth().post('Media/upload/', {
    name: name,
  })
}
```

### 2. **Backend Media Views (`Media/views.py`)**

El backend maneja los archivos con este flujo:

1. **Guardar archivo** (`/Media/save/`):
   - Recibe el archivo y el `galleryType`
   - Genera un UUID temporal
   - Valida extensión y tipo de archivo
   - Guarda en base de datos
   - Renombra el archivo con el ID generado
   - Organiza en carpetas por tipo: `media/{galleryType}/{userId}/{id}.{ext}`

2. **Gallery Types** definidos:
```python
GALLERY_TYPE_NAMES = {
    1: 'CustomIMG',
    2: 'Background',
    3: 'Shapes',
    4: 'Characters',
    5: 'Objects',
    6: 'Others',
    7: 'BookCover',
}
```

### 3. **Flujo Completo en BookBuilder**

Ejemplo de cómo se suben imágenes de portadas de libros:

```javascript
const uploadImage = async () => {
  // Paso 1: Guardar el archivo en Media
  const response1 = await saveImageFile()
  
  if (!response1.data || !response1.data.name) {
    throw new Error('Error uploading the image')
  }

  // Paso 2: Obtener la ruta del archivo
  const imageName = response1.data.name
  const response2 = await getImageRoute(imageName)

  if (!response2.data || !response2.data.file_route) {
    throw new Error('Error getting the image route')
  }

  return response2.data.file_route
}

const saveImageFile = async () => {
  // galleryType = 7 para portadas de libro (BookCover)
  return await save_Image(fileImage, 7)
}
```

### 4. **UploadCustom Component**

Este componente muestra el patrón completo de subida:

```javascript
const handleFiles = async (files) => {
  const file = files && files[0];
  
  // Validación tipo
  const allowedMime = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedMime.includes(file.type)) {
    setError('Tipo de archivo no permitido.');
    return;
  }
  
  // Validación tamaño (5MB máximo)
  if (file.size > 5 * 1024 * 1024) {
    setError('El archivo supera el tamaño máximo de 5MB.');
    return;
  }
  
  setLoading(true);
  try {
    const res = await save_Image(file, galleryType);
    setSuccess(true);
    onUpload(file);
  } catch (err) {
    setError('Error al subir la imagen.');
  }
}
```

## 📋 Recomendaciones para Badges

### 1. **Modelo de Badge Actual**
```python
class Badge(models.Model):
    icon = models.CharField(max_length=255, blank=True, null=True)
```

El campo `icon` actualmente es un CharField, probablemente almacenando:
- Nombres de íconos FontAwesome
- URLs de imágenes

### 2. **Opciones de Implementación**

#### **Opción A: Usar galleryType dedicado para Badges**
Agregar un nuevo tipo a `GALLERY_TYPE_NAMES`:

```python
GALLERY_TYPE_NAMES = {
    1: 'CustomIMG',
    2: 'Background',
    3: 'Shapes',
    4: 'Characters',
    5: 'Objects',
    6: 'Others',
    7: 'BookCover',
    8: 'BadgeIcons',  # NUEVO
}
```

#### **Opción B: Usar CustomIMG (galleryType=1)**
Más simple, usar el tipo existente para imágenes personalizadas.

### 3. **Modificaciones Requeridas**

#### **Frontend - BadgeFormModal.jsx**

```javascript
import { save_Image, upload } from '../../../api/media';

// Agregar estado para la imagen
const [iconFile, setIconFile] = useState(null);
const [iconPreview, setIconPreview] = useState(null);

const handleIconUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validaciones
    const allowedMime = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!allowedMime.includes(file.type)) {
      setErrors(prev => ({ ...prev, icon: 'Only PNG, JPG, JPEG, SVG allowed' }));
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, icon: 'Max size 2MB' }));
      return;
    }

    setIconFile(file);
    
    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setIconPreview(e.target.result);
    reader.readAsDataURL(file);
  }
};

const uploadIcon = async () => {
  if (!iconFile) return null;
  
  try {
    // Paso 1: Guardar imagen
    const saveResponse = await save_Image(iconFile, 8); // o 1 para CustomIMG
    
    if (!saveResponse.data || !saveResponse.data.name) {
      throw new Error('Error uploading icon');
    }
    
    // Paso 2: Obtener ruta
    const imageName = saveResponse.data.name;
    const uploadResponse = await upload(imageName);
    
    if (!uploadResponse.data || !uploadResponse.data.file_route) {
      throw new Error('Error getting icon route');
    }
    
    return uploadResponse.data.file_route;
  } catch (error) {
    console.error('Error uploading icon:', error);
    throw error;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  setSaving(true);
  
  try {
    // Subir icono si hay uno nuevo
    let iconUrl = formData.icon; // Mantener el existente si es edición
    
    if (iconFile) {
      iconUrl = await uploadIcon();
    }
    
    // Preparar datos
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      points: parseInt(formData.points) || 0,
      is_teacher_badge: formData.is_teacher_badge,
      show_progress: formData.show_progress,
      goal_points: formData.show_progress ? parseInt(formData.goal_points) : null,
      icon: iconUrl // Ruta de la imagen o nombre del ícono
    };
    
    await onSave(dataToSend);
    
    // Reset
    setIconFile(null);
    setIconPreview(null);
    
  } catch (error) {
    console.error('Error saving badge:', error);
    toast.error('Error saving badge');
  } finally {
    setSaving(false);
  }
};
```

#### **Backend - Badges/views.py**

El backend actual ya soporta el campo `icon` como CharField. No requiere cambios si solo guardamos la URL de la imagen.

```python
@api_view(['POST'])
def create_badge(request):
    # El serializer manejará el campo icon automáticamente
    serializer = BadgeSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
```

#### **Alternativa: Relación con Media Model**

Si se prefiere una relación más formal:

```python
# models.py
from Media.models import Media

class Badge(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    points = models.IntegerField()
    icon = models.CharField(max_length=255, blank=True, null=True)  # Para FontAwesome
    icon_image = models.ForeignKey(
        Media, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='badge_icons'
    )  # Para imágenes personalizadas
```

### 4. **UI/UX Recomendado**

```jsx
<Form.Group>
  <Form.Label>Badge Icon</Form.Label>
  
  {/* Opción 1: Usar ícono FontAwesome */}
  <Form.Control
    type="text"
    name="icon"
    value={formData.icon}
    onChange={handleChange}
    placeholder="e.g., book, star, trophy"
  />
  
  <div className="my-2">OR</div>
  
  {/* Opción 2: Subir imagen personalizada */}
  <div className="custom-file-upload">
    <input
      type="file"
      id="icon-upload"
      accept="image/png,image/jpeg,image/jpg,image/svg+xml"
      onChange={handleIconUpload}
      hidden
    />
    <Button
      variant="outline-secondary"
      onClick={() => document.getElementById('icon-upload').click()}
    >
      <FontAwesomeIcon icon={faUpload} /> Upload Custom Icon
    </Button>
  </div>
  
  {/* Preview */}
  {iconPreview && (
    <div className="icon-preview mt-2">
      <img src={iconPreview} alt="Icon preview" style={{width: 64, height: 64}} />
      <Button
        variant="link"
        size="sm"
        onClick={() => {
          setIconFile(null);
          setIconPreview(null);
        }}
      >
        Remove
      </Button>
    </div>
  )}
</Form.Group>
```

## ✅ Checklist de Implementación

- [ ] Decidir entre galleryType 8 (nuevo) o 1 (existente)
- [ ] Agregar estado para archivo de ícono en BadgeFormModal
- [ ] Implementar handleIconUpload con validaciones
- [ ] Implementar uploadIcon usando save_Image + upload
- [ ] Modificar handleSubmit para subir ícono antes de guardar badge
- [ ] Agregar preview de imagen en el formulario
- [ ] Agregar validación de tamaño (max 2MB)
- [ ] Agregar validación de tipo (PNG, JPG, JPEG, SVG)
- [ ] Manejar errores de subida con toast
- [ ] Mostrar loading state durante la subida
- [ ] Actualizar vista de badges para mostrar imágenes personalizadas
- [ ] Agregar fallback a FontAwesome si no hay imagen

## 🎯 Ventajas de este Enfoque

1. ✅ **Consistente** con el resto de la aplicación
2. ✅ **Reutiliza** la infraestructura existente de Media
3. ✅ **Organizado** en carpetas por tipo
4. ✅ **Seguro** con validaciones de tipo y tamaño
5. ✅ **Escalable** para futuros tipos de media
6. ✅ **Sin cambios** en el modelo de base de datos actual
7. ✅ **Compatible** con íconos FontAwesome existentes

## 📝 Notas Adicionales

- El sistema actual de Media ya maneja multipart/form-data
- Los archivos se organizan automáticamente por usuario
- Las imágenes se pueden recuperar con `/api/media/{file_route}`
- El componente UploadMedia ya existe y podría reutilizarse
